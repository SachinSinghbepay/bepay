#!/usr/bin/env node
/**
 * IGPS Service — Full Integration Test
 * 
 * Phases:
 *   A. Merchant Auth Lifecycle (signup → login → profile → refresh → update → change-password)
 *   B. Team Management (invite → accept → list → promote → remove)
 *   C. Payment Operations via JWT (quote → countries → banks → merchant info → balances)
 *   D. Cleanup (logout-all → verify refresh revoked)
 * 
 * Requires: server running on BASE_URL (default http://localhost:3002)
 */

const BASE = process.env.BASE_URL || 'http://localhost:3002';
const API = `${BASE}/api/igps`;

// ─── Test state ──────────────────────────────────────────────────────────────
const STATE = {
    accessToken: null,
    refreshToken: null,
    orgId: null,
    ownerId: null,
    inviteToken: null,
    invitedMemberId: null,
    testEmail: `test_${Date.now()}@bepay-test.com`,
    testPassword: 'TestPass123!',
    newPassword: 'NewPass456!',
    teamEmail: `team_${Date.now()}@bepay-test.com`,
    orgName: `TestOrg_${Date.now()}`,
    orgSlug: `testorg-${Date.now()}`,
};

let passed = 0;
let failed = 0;
let skipped = 0;
const results = [];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function request(method, path, { body, token, headers: extraHeaders } = {}) {
    const url = path.startsWith('http') ? path : `${API}${path}`;
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (extraHeaders) Object.assign(headers, extraHeaders);

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(url, opts);
    let data;
    try { data = await res.json(); } catch { data = null; }
    return { status: res.status, data };
}

/**
 * Extract tokens from the standardized response shape:
 * { success, data: { tokens: { accessToken, refreshToken } } }
 */
function extractTokens(data) {
    const tokens = data?.data?.tokens || data?.tokens || data;
    return {
        accessToken: tokens?.accessToken || null,
        refreshToken: tokens?.refreshToken || null,
    };
}

/** Extract user from response */
function extractUser(data) {
    return data?.data?.user || data?.user || null;
}

/** Extract organization from response */
function extractOrg(data) {
    return data?.data?.organization || data?.organization || null;
}

async function test(name, fn) {
    try {
        await fn();
        passed++;
        results.push({ name, status: 'PASS' });
        console.log(`  ✅ ${name}`);
    } catch (err) {
        failed++;
        results.push({ name, status: 'FAIL', error: err.message });
        console.log(`  ❌ ${name}: ${err.message}`);
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function assertEqual(actual, expected, label) {
    if (actual !== expected) {
        throw new Error(`${label}: expected "${expected}", got "${actual}"`);
    }
}

// ─── Phase A: Merchant Auth Lifecycle ─────────────────────────────────────────

async function phaseA() {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  Phase A: Merchant Auth Lifecycle             ║');
    console.log('╚══════════════════════════════════════════════╝');

    // A1: Signup
    await test('A1 — Signup creates org + owner + tokens', async () => {
        const { status, data } = await request('POST', '/auth/signup', {
            body: {
                email: STATE.testEmail,
                password: STATE.testPassword,
                organizationName: STATE.orgName,
                organizationSlug: STATE.orgSlug,
                firstName: 'Test',
                lastName: 'Owner',
            }
        });
        assert(status >= 200 && status < 300, `Expected 2xx, got ${status}: ${JSON.stringify(data)}`);

        const tokens = extractTokens(data);
        const user = extractUser(data);
        const org = extractOrg(data);
        assert(tokens.accessToken, `Missing accessToken in: ${JSON.stringify(data)}`);
        assert(tokens.refreshToken, 'Missing refreshToken');
        assert(user, 'Missing user object');
        assert(org, 'Missing organization object');

        STATE.accessToken = tokens.accessToken;
        STATE.refreshToken = tokens.refreshToken;
        STATE.orgId = org.id;
        STATE.ownerId = user.id;
    });

    // A2: Duplicate signup rejected
    await test('A2 — Duplicate signup rejected', async () => {
        const { status } = await request('POST', '/auth/signup', {
            body: {
                email: STATE.testEmail,
                password: STATE.testPassword,
                organizationName: 'Dup Org',
                organizationSlug: 'dup-org',
            }
        });
        assert(status >= 400 && status < 500, `Expected 4xx, got ${status}`);
    });

    // A3: Login
    await test('A3 — Login with correct credentials', async () => {
        const { status, data } = await request('POST', '/auth/login', {
            body: { email: STATE.testEmail, password: STATE.testPassword }
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const tokens = extractTokens(data);
        assert(tokens.accessToken, 'Missing accessToken');
        assert(tokens.refreshToken, 'Missing refreshToken');

        STATE.accessToken = tokens.accessToken;
        STATE.refreshToken = tokens.refreshToken;
    });

    // A4: Login with wrong password
    await test('A4 — Login with wrong password rejected', async () => {
        const { status } = await request('POST', '/auth/login', {
            body: { email: STATE.testEmail, password: 'WrongPass999!' }
        });
        assert(status >= 400 && status < 500, `Expected 4xx, got ${status}`);
    });

    // A5: Get profile
    await test('A5 — Get profile (me)', async () => {
        const { status, data } = await request('GET', '/auth/me', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
        const user = extractUser(data);
        assertEqual(user?.email, STATE.testEmail, 'Email mismatch');
    });

    // A6: Refresh token
    await test('A6 — Refresh token rotates pair', async () => {
        const { status, data } = await request('POST', '/auth/refresh', {
            body: { refreshToken: STATE.refreshToken }
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const tokens = extractTokens(data);
        assert(tokens.accessToken, 'Missing new accessToken');
        assert(tokens.refreshToken, 'Missing new refreshToken');
        assert(tokens.refreshToken !== STATE.refreshToken, 'Refresh token was not rotated');

        // Save old refresh for A7 test
        STATE.oldRefreshToken = STATE.refreshToken;
        STATE.accessToken = tokens.accessToken;
        STATE.refreshToken = tokens.refreshToken;
    });

    // A7: Old refresh token rejected (rotation invalidates it)
    await test('A7 — Old refresh token rejected after rotation', async () => {
        const { status } = await request('POST', '/auth/refresh', {
            body: { refreshToken: STATE.oldRefreshToken }
        });
        assert(status >= 400, `Expected 4xx, got ${status}`);
    });

    // A8: Update profile
    await test('A8 — Update profile (change name)', async () => {
        const { status, data } = await request('PATCH', '/auth/me', {
            token: STATE.accessToken,
            body: { firstName: 'Updated', lastName: 'Merchant' },
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const user = extractUser(data);
        if (user) {
            assertEqual(user.firstName, 'Updated', 'firstName not updated');
        }
    });

    // A9: Change password
    await test('A9 — Change password', async () => {
        const { status, data } = await request('POST', '/auth/change-password', {
            token: STATE.accessToken,
            body: {
                currentPassword: STATE.testPassword,
                newPassword: STATE.newPassword,
            }
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
    });

    // A10: Re-login with new password
    await test('A10 — Re-login with new password', async () => {
        const { status, data } = await request('POST', '/auth/login', {
            body: { email: STATE.testEmail, password: STATE.newPassword }
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const tokens = extractTokens(data);
        STATE.accessToken = tokens.accessToken;
        STATE.refreshToken = tokens.refreshToken;
    });

    // A11: Old password rejected
    await test('A11 — Old password no longer works', async () => {
        const { status } = await request('POST', '/auth/login', {
            body: { email: STATE.testEmail, password: STATE.testPassword }
        });
        assert(status >= 400, `Expected 4xx, got ${status}`);
    });
}

// ─── Phase B: Team Management ─────────────────────────────────────────────────

async function phaseB() {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  Phase B: Team Management                     ║');
    console.log('╚══════════════════════════════════════════════╝');

    // B1: Invite team member (POST /team/invites — authenticated)
    await test('B1 — Invite team member', async () => {
        const { status, data } = await request('POST', '/team/invites', {
            token: STATE.accessToken,
            body: { email: STATE.teamEmail, role: 'member' },
        });
        assert(status >= 200 && status < 300, `Expected 2xx, got ${status}: ${JSON.stringify(data)}`);

        const invite = data?.data?.invite || data?.data || data?.invite || data;
        STATE.inviteToken = invite?.token || invite?.inviteToken;
        assert(STATE.inviteToken, `Missing invite token in: ${JSON.stringify(data)}`);
    });

    // B2: List pending invites
    await test('B2 — List pending invites', async () => {
        const { status, data } = await request('GET', '/team/invites', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const invites = data?.data?.invites || data?.data || data?.invites || data;
        const list = Array.isArray(invites) ? invites : [];
        assert(list.length > 0, `Expected at least 1 invite, got ${list.length}`);
    });

    // B3: Accept invite (public route — no auth)
    await test('B3 — Accept invite (public, creates member)', async () => {
        const { status, data } = await request('POST', `/team/invites/${STATE.inviteToken}/accept`, {
            body: {
                password: STATE.testPassword,
                firstName: 'Team',
                lastName: 'Member',
            }
        });
        assert(status >= 200 && status < 300, `Expected 2xx, got ${status}: ${JSON.stringify(data)}`);

        const user = data?.data?.user || data?.user;
        STATE.invitedMemberId = user?.id || data?.data?.userId || data?.userId || data?.data?.memberId;
    });

    // B4: List members (owner + new member)
    await test('B4 — List members shows owner + new member', async () => {
        const { status, data } = await request('GET', '/team/members', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const members = data?.data?.members || data?.data || data?.members || data;
        const list = Array.isArray(members) ? members : [];
        assert(list.length >= 2, `Expected ≥2 members, got ${list.length}`);

        // Fallback: find member ID if B3 didn't return it
        if (!STATE.invitedMemberId) {
            const invited = list.find(m => m.email === STATE.teamEmail);
            STATE.invitedMemberId = invited?.id;
        }
    });

    // B5: Promote to admin
    await test('B5 — Promote member to admin', async () => {
        if (!STATE.invitedMemberId) {
            skipped++;
            console.log('  ⏭️  B5 skipped — no member ID');
            return;
        }
        const { status, data } = await request('PATCH', `/team/members/${STATE.invitedMemberId}/role`, {
            token: STATE.accessToken,
            body: { role: 'admin' },
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
    });

    // B6: Remove member
    await test('B6 — Remove team member', async () => {
        if (!STATE.invitedMemberId) {
            skipped++;
            console.log('  ⏭️  B6 skipped — no member ID');
            return;
        }
        const { status, data } = await request('DELETE', `/team/members/${STATE.invitedMemberId}`, {
            token: STATE.accessToken,
        });
        assert(status === 200 || status === 204, `Expected 200/204, got ${status}: ${JSON.stringify(data)}`);
    });

    // B7: Confirm only owner remains
    await test('B7 — Members list back to owner only', async () => {
        const { status, data } = await request('GET', '/team/members', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}`);

        const members = data?.data?.members || data?.data || data?.members || data;
        const list = Array.isArray(members) ? members : [];
        const active = list.filter(m => m.isActive !== false);
        assert(active.length === 1, `Expected 1 active member, got ${active.length}`);
    });
}

// ─── Phase C: Payment Operations (JWT auth) ──────────────────────────────────

async function phaseC() {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  Phase C: Payment Operations (JWT auth)       ║');
    console.log('╚══════════════════════════════════════════════╝');

    // C1: Get quote (USDC_ETH → INR)
    await test('C1 — Get quote (USDC_ETH → INR)', async () => {
        const { status, data } = await request('POST', '/quotes', {
            token: STATE.accessToken,
            body: { sourceCurrency: 'USDC', targetCurrency: 'INR', targetAmount: 100 },
        });
        assert(status === 201, `Expected 201, got ${status}: ${JSON.stringify(data)}`);
        const quote = data?.data || data;
        assert(quote.sourceCurrency || quote.mestaQuoteId, 'Quote missing expected fields');
        console.log(`       → Quote ID: ${quote.mestaQuoteId || quote.id}`);
        console.log(`       → Rate: ${quote.exchangeRate}, Source: ${quote.sourceAmount} ${quote.sourceCurrency}`);
    });

    // C2: List currencies
    await test('C2 — List supported currencies', async () => {
        const { status, data } = await request('GET', '/currencies', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
        const currencies = data?.data || data;
        const srcList = currencies?.sourceCurrencies || [];
        assert(srcList.length > 0, 'Expected at least 1 source currency');
        console.log(`       → ${srcList.length} source currencies: ${srcList.join(', ')}`);
    });

    // C3: Get banks for India
    await test('C3 — Get banks for India (IN)', async () => {
        const { status, data } = await request('GET', '/banks/IN', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
        const banks = data?.data || data;
        const list = Array.isArray(banks) ? banks : banks?.data || [];
        assert(list.length > 0, 'Expected at least 1 bank for India');
        console.log(`       → ${list.length} banks (first: ${list[0]?.name || list[0]?.id})`);
    });

    // C4: Merchant info
    await test('C4 — Get merchant info', async () => {
        const { status, data } = await request('GET', '/merchant/info', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
        const info = data?.data || data;
        assert(info.name || info.id, 'Merchant info missing name/id');
        console.log(`       → Merchant: ${info.name} (${info.status})`);
    });

    // C5: Merchant balances
    await test('C5 — Get merchant balances', async () => {
        const { status, data } = await request('GET', '/merchant/balances', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
        const balances = data?.data || data;
        const list = Array.isArray(balances) ? balances : [];
        console.log(`       → ${list.length} balance entries`);
    });

    // C6: Get merchant accounts
    await test('C6 — Get merchant accounts', async () => {
        const { status, data } = await request('GET', '/merchant/accounts', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
        const accounts = data?.data || data;
        const list = Array.isArray(accounts) ? accounts : [];
        assert(list.length > 0, 'Expected at least 1 merchant account');
        console.log(`       → ${list.length} accounts (currencies: ${list.map(a => a.currency).join(', ')})`);
    });
}

// ─── Phase D: Cleanup ─────────────────────────────────────────────────────────

async function phaseD() {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  Phase D: Cleanup & Token Revocation          ║');
    console.log('╚══════════════════════════════════════════════╝');

    const savedToken = STATE.accessToken;

    // D1: Logout all sessions
    await test('D1 — Logout all sessions', async () => {
        const { status, data } = await request('POST', '/auth/logout-all', {
            token: STATE.accessToken,
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);
    });

    // D2: Refresh tokens revoked
    await test('D2 — Refresh token revoked after logout-all', async () => {
        const { status } = await request('POST', '/auth/refresh', {
            body: { refreshToken: STATE.refreshToken },
        });
        assert(status >= 400, `Expected 4xx, got ${status}`);
    });

    // D3: JWT still valid (stateless, until expiry)
    await test('D3 — JWT still valid until expiry (stateless)', async () => {
        const { status } = await request('GET', '/auth/me', {
            token: savedToken,
        });
        assert(status === 200, `Expected 200 (JWT is stateless), got ${status}`);
    });

    // D4: Can re-login after logout-all
    await test('D4 — Can re-login after logout-all', async () => {
        const { status, data } = await request('POST', '/auth/login', {
            body: { email: STATE.testEmail, password: STATE.newPassword }
        });
        assert(status === 200, `Expected 200, got ${status}: ${JSON.stringify(data)}`);

        const tokens = extractTokens(data);
        assert(tokens.accessToken, 'Missing accessToken on re-login');
    });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
    console.log('═══════════════════════════════════════════════════');
    console.log('  IGPS Service — Full Integration Test');
    console.log(`  Server: ${BASE}`);
    console.log(`  Test email: ${STATE.testEmail}`);
    console.log(`  Org: ${STATE.orgName}`);
    console.log('═══════════════════════════════════════════════════');

    // Health check — try /api/igps/health first (proxy mode), then /health (direct)
    try {
        let res = await fetch(`${BASE}/api/igps/health`).catch(() => null);
        if (!res || !res.ok) res = await fetch(`${BASE}/health`);
        const data = await res.json();
        if (data.status !== 'healthy') throw new Error('unhealthy');
        console.log(`\n  🟢 Server healthy (uptime: ${Math.round(data.uptime)}s)`);
    } catch (err) {
        console.error(`\n  🔴 Server not reachable at ${BASE}: ${err.message}`);
        console.error('     Start the server first: node src/server.js');
        process.exit(1);
    }

    const startTime = Date.now();

    await phaseA();
    await phaseB();
    await phaseC();
    await phaseD();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    // Summary
    console.log('\n═══════════════════════════════════════════════════');
    console.log('  RESULTS');
    console.log('═══════════════════════════════════════════════════');
    console.log(`  ✅ Passed:  ${passed}`);
    console.log(`  ❌ Failed:  ${failed}`);
    if (skipped) console.log(`  ⏭️  Skipped: ${skipped}`);
    console.log(`  Total:    ${passed + failed + skipped}`);
    console.log(`  Time:     ${elapsed}s`);
    console.log('═══════════════════════════════════════════════════\n');

    if (failed > 0) {
        console.log('  Failed tests:');
        results.filter(r => r.status === 'FAIL').forEach(r => {
            console.log(`    • ${r.name}`);
            console.log(`      ${r.error}`);
        });
        console.log('');
    }

    process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
