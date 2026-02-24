"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { IgpsService } from "../../../services/igpsService";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

const igpsService = new IgpsService();

const REFRESH_INTERVAL_MS = 13 * 60 * 1000; // 13 min (access token lives 15 min)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const refreshIntervalRef = useRef(null);

    // ─── Cookie helper ─────────────────────────────────────────────────────────
    const getCookie = (name) => {
        if (typeof document === "undefined") return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
    };

    // ─── Proactive token refresh (runs every 13 min) ───────────────────────────
    const doTokenRefresh = async () => {
        const refreshToken = getCookie("igps_refresh");
        if (!refreshToken) {
            handleSessionExpired();
            return;
        }

        const response = await igpsService.refreshTokenCall({ refreshToken });

        if (response.success && response.data?.tokens?.accessToken) {
            const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;

            document.cookie = `igps_token=${accessToken}; path=/; max-age=900; SameSite=Strict`;
            document.cookie = `igps_refresh=${newRefreshToken}; path=/; max-age=604800; SameSite=Strict`;

            igpsService.setTokens(accessToken, newRefreshToken);
        } else {
            handleSessionExpired();
        }
    };

    const startRefreshInterval = () => {
        if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = setInterval(doTokenRefresh, REFRESH_INTERVAL_MS);
    };

    const stopRefreshInterval = () => {
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
            refreshIntervalRef.current = null;
        }
    };

    const handleSessionExpired = () => {
        stopRefreshInterval();
        IgpsService.clearAllCaches();
        igpsService.setTokens("", "");
        setUser(null);
        setOrganization(null);
        router.push("/igps/login");
    };
    // ──────────────────────────────────────────────────────────────────────────

    // Check session on mount — use refresh token first to get fresh access token
    useEffect(() => {
        const checkSession = async () => {
            try {
                const refreshToken = getCookie("igps_refresh");

                if (!refreshToken) {
                    // No refresh token — not logged in
                    setLoading(false);
                    return;
                }

                // Step 1: Get fresh access token using refresh token
                const refreshRes = await igpsService.refreshTokenCall({ refreshToken });

                if (!refreshRes.success) {
                    // Refresh token invalid/expired — not logged in
                    setLoading(false);
                    return;
                }

                const { accessToken, refreshToken: newRefreshToken } = refreshRes.data.tokens;

                document.cookie = `igps_token=${accessToken}; path=/; max-age=900; SameSite=Strict`;
                document.cookie = `igps_refresh=${newRefreshToken}; path=/; max-age=604800; SameSite=Strict`;
                igpsService.setTokens(accessToken, newRefreshToken);

                // Step 2: Load user profile with fresh token
                const profileRes = await igpsService.getProfile();

                if (profileRes.success) {
                    if (profileRes.data.user) {
                        setUser(profileRes.data.user);
                        setOrganization(profileRes.data.organization || null);
                    } else {
                        setUser(profileRes.data);
                        setOrganization(null);
                    }
                    startRefreshInterval();
                } else {
                    setUser(null);
                    setOrganization(null);
                }

            } catch (err) {
                console.error("Session check failed", err);
                setUser(null);
                setOrganization(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        return () => stopRefreshInterval();
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await igpsService.login({ email, password });

            if (!res.success) {
                return { success: false, error: res.error || res.message };
            }

            if (res.data.requiresTwoFactor) {
                return {
                    success: false,
                    requiresTwoFactor: true,
                    twoFactorData: res.data
                };
            }

            const { user, tokens, organization } = res.data;
            const { accessToken, refreshToken } = tokens;

            document.cookie = `igps_token=${accessToken}; path=/; max-age=900; SameSite=Strict`;
            document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=604800; SameSite=Strict`;

            igpsService.setTokens(accessToken, refreshToken);

            setUser(user);
            setOrganization(organization || null);

            startRefreshInterval();

            return { success: true };

        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const completeLogin = async (accessToken, refreshToken) => {
        document.cookie = `igps_token=${accessToken}; path=/; max-age=900; SameSite=Strict`;
        document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=604800; SameSite=Strict`;

        igpsService.setTokens(accessToken, refreshToken);

        const profileRes = await igpsService.getProfile();

        if (profileRes.success) {
            setUser(profileRes.data.user);
            setOrganization(profileRes.data.organization || null);
            startRefreshInterval();
            return true;
        }

        return false;
    };

    const logout = async () => {
        setLoading(true);

        stopRefreshInterval();

        try {
            await igpsService.logout();
        } catch (error) {
            console.error("Logout API failed:", error);
        }

        igpsService.setTokens("", "");

        if (typeof window !== "undefined") {
            document.cookie = "igps_token=; path=/; max-age=0; SameSite=Strict";
            document.cookie = "igps_refresh=; path=/; max-age=0; SameSite=Strict";
        }

        setUser(null);
        setOrganization(null);

        router.push("/igps/login");

        setLoading(false);
    };

    const refreshUser = async () => {
        try {
            const res = await igpsService.getProfile();
            if (res.success) {
                setUser(res.data.user);
                setOrganization(res.data.organization || null);
            }
        } catch (err) {
            console.error("Refresh user failed", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, organization, loading, login, logout, igpsService, refreshUser, completeLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);