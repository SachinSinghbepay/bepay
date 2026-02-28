"use client";

import { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { IgpsService } from "../../../services/igpsService";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

const igpsService = new IgpsService();

// Token storage keys for localStorage fallback
const ACCESS_TOKEN_KEY = "igps_access_token";
const REFRESH_TOKEN_KEY = "igps_refresh_token";

// Unified cookie settings - 1 day for access token, 7 days for refresh
const ACCESS_TOKEN_MAX_AGE = 86400; // 1 day in seconds
const REFRESH_TOKEN_MAX_AGE = 604800; // 7 days in seconds
const REFRESH_INTERVAL_MS = 13 * 60 * 1000; // 13 min (before 15 min expiry)

// ================= HELPER FUNCTIONS =================

// Cookie helper with proper settings
const setCookie = (name, value, maxAge) => {
    if (typeof document === "undefined") return;

    // Calculate expires date for better compatibility
    const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

    // Set cookie with Secure, SameSite=Strict for production
    const isProduction = process.env.NODE_ENV === "production";
    const secureFlag = isProduction ? "; Secure" : "";

    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict${secureFlag}; expires=${expires}`;
};

const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
};

const deleteCookie = (name) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

// LocalStorage helpers for backup
const setLocalStorage = (key, value) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.error("LocalStorage set error:", e);
    }
};

const getLocalStorage = (key) => {
    if (typeof window === "undefined") return null;
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.error("LocalStorage get error:", e);
        return null;
    }
};

const removeLocalStorage = (key) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(key);
    } catch (e) {
        console.error("LocalStorage remove error:", e);
    }
};

// ================= BROADCAST CHANNEL FOR CROSS-TAB SYNC =================
let broadcastChannel = null;

const getBroadcastChannel = () => {
    if (typeof window === "undefined") return null;
    if (!broadcastChannel) {
        try {
            broadcastChannel = new BroadcastChannel("igps_auth_channel");
        } catch (e) {
            console.warn("BroadcastChannel not supported:", e);
        }
    }
    return broadcastChannel;
};

// ================= MAIN AUTH PROVIDER =================

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const refreshIntervalRef = useRef(null);
    const isRefreshingRef = useRef(false);
    const sessionCheckRetries = useRef(0);
    const maxRetries = 3;

    const [kycStatus, setKycStatus] = useState("loading");
    // values: "loading" | "complete" | "incomplete"

    // ─── Unified Token Setter (sets both cookie + localStorage) ──────────────────
    const setTokens = useCallback((accessToken, refreshToken, setInService = true) => {
        // Set in IgpsService
        if (setInService) {
            igpsService.setTokens(accessToken, refreshToken);
        }

        // Set cookies with unified settings
        setCookie("igps_token", accessToken, ACCESS_TOKEN_MAX_AGE);
        setCookie("igps_refresh", refreshToken, REFRESH_TOKEN_MAX_AGE);

        // ALSO set in localStorage as backup (for when cookies are cleared)
        setLocalStorage(ACCESS_TOKEN_KEY, accessToken);
        setLocalStorage(REFRESH_TOKEN_KEY, refreshToken);

        // Notify other tabs
        const channel = getBroadcastChannel();
        if (channel) {
            channel.postMessage({ type: "TOKEN_UPDATED", accessToken, refreshToken });
        }
    }, []);

    // ─── Unified Token Getter (prefers cookie, falls back to localStorage) ───────
    const getTokens = useCallback(() => {
        let accessToken = getCookie("igps_token");
        let refreshToken = getCookie("igps_refresh");

        // Fallback to localStorage if cookies are cleared
        if (!accessToken) {
            accessToken = getLocalStorage(ACCESS_TOKEN_KEY);
            refreshToken = getLocalStorage(REFRESH_TOKEN_KEY);

            // Restore to cookies if found in localStorage
            if (accessToken && refreshToken) {
                console.log("🔄 Restoring tokens from localStorage to cookies");
                setTokens(accessToken, refreshToken);
            }
        }

        return { accessToken, refreshToken };
    }, [setTokens]);

    // ─── Token Refresh Function (ONLY ONE - in AuthContext) ─────────────────────
    const doTokenRefresh = useCallback(async () => {
        // Prevent multiple simultaneous refreshes
        if (isRefreshingRef.current) {
            console.log("⏳ Token refresh already in progress, skipping...");
            return;
        }

        const { refreshToken } = getTokens();

        if (!refreshToken) {
            console.log("❌ No refresh token found");
            handleSessionExpired();
            return;
        }

        isRefreshingRef.current = true;

        try {
            const response = await igpsService.refreshTokenCall({ refreshToken });

            if (response.success && response.data?.tokens?.accessToken) {
                const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;

                // Update tokens everywhere (cookies + localStorage + service)
                setTokens(accessToken, newRefreshToken, true);

                console.log("✅ Token refreshed successfully");
            } else {
                console.log("❌ Token refresh failed:", response.message);
                handleSessionExpired();
            }
        } catch (error) {
            console.error("❌ Token refresh error:", error);
            handleSessionExpired();
        } finally {
            isRefreshingRef.current = false;
        }
    }, [getTokens, setTokens]);

    // ─── Start Refresh Interval ─────────────────────────────────────────────────
    const startRefreshInterval = useCallback(() => {
        // Clear any existing interval first
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
        }

        // Start new interval - refresh every 13 minutes
        refreshIntervalRef.current = setInterval(() => {
            console.log("⏰ Scheduled token refresh triggered");
            doTokenRefresh();
        }, REFRESH_INTERVAL_MS);

        console.log("🔄 Refresh interval started (every 13 minutes)");
    }, [doTokenRefresh]);

    // ─── Stop Refresh Interval ─────────────────────────────────────────────────
    const stopRefreshInterval = useCallback(() => {
        if (refreshIntervalRef.current) {
            clearInterval(refreshIntervalRef.current);
            refreshIntervalRef.current = null;
            console.log("⏹️ Refresh interval stopped");
        }
    }, []);

    // ─── Handle Session Expired ─────────────────────────────────────────────────
    const handleSessionExpired = useCallback(() => {
        stopRefreshInterval();

        // Clear from everywhere
        IgpsService.clearAllCaches();
        igpsService.setTokens("", "");

        // Clear cookies
        deleteCookie("igps_token");
        deleteCookie("igps_refresh");

        // Clear localStorage
        removeLocalStorage(ACCESS_TOKEN_KEY);
        removeLocalStorage(REFRESH_TOKEN_KEY);

        // Clear state
        setUser(null);
        setOrganization(null);

        // Notify other tabs
        const channel = getBroadcastChannel();
        if (channel) {
            channel.postMessage({ type: "SESSION_EXPIRED" });
        }

        // Redirect to login if not already there
        if (pathname !== "/igps/login") {
            router.push("/igps/login");
        }
    }, [stopRefreshInterval, pathname, router]);

    // ─── Check Session on Mount (with retry logic) ─────────────────────────────
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { refreshToken, accessToken } = getTokens();

                // No tokens at all - not logged in
                if (!refreshToken && !accessToken) {
                    console.log("❌ No tokens found");
                    setLoading(false);
                    return;
                }

                // Try to get fresh access token using refresh token
                let currentAccessToken = accessToken;
                let currentRefreshToken = refreshToken;

                if (refreshToken) {
                    try {
                        const refreshRes = await igpsService.refreshTokenCall({ refreshToken });

                        if (refreshRes.success && refreshRes.data?.tokens?.accessToken) {
                            currentAccessToken = refreshRes.data.tokens.accessToken;
                            currentRefreshToken = refreshRes.data.tokens.refreshToken;

                            // Update tokens everywhere
                            setTokens(currentAccessToken, currentRefreshToken, true);
                            console.log("✅ Initial token refresh successful");
                        } else {
                            // Refresh token might be invalid, try with existing access token
                            console.log("⚠️ Refresh token invalid, trying with existing access token");
                        }
                    } catch (refreshError) {
                        console.error("❌ Initial refresh failed:", refreshError);
                        // Retry once after delay
                        if (sessionCheckRetries.current < maxRetries) {
                            sessionCheckRetries.current++;
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            return checkSession();
                        }
                    }
                }

                // Load user profile with token
                if (currentAccessToken) {
                    igpsService.setTokens(currentAccessToken, currentRefreshToken);

                    const profileRes = await igpsService.getProfile();

                    if (profileRes.success) {
                        if (profileRes.data.user) {
                            setUser(profileRes.data.user);
                            setOrganization(profileRes.data.organization || null);
                        } else {
                            setUser(profileRes.data);
                            setOrganization(null);
                        }

                        // Start refresh interval ONLY after successful session check
                        startRefreshInterval();
                        console.log("✅ Session verified, user logged in");
                    } else {
                        console.log("❌ Profile fetch failed:", profileRes.message);
                        // Don't immediately logout - could be temporary
                        if (profileRes.message?.includes("expired") || profileRes.message?.includes("invalid")) {
                            handleSessionExpired();
                        }
                    }
                }

            } catch (err) {
                console.error("❌ Session check error:", err);
                // Retry logic
                if (sessionCheckRetries.current < maxRetries) {
                    sessionCheckRetries.current++;
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    return checkSession();
                }
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // Cleanup on unmount
        return () => stopRefreshInterval();
    }, [getTokens, setTokens, startRefreshInterval, stopRefreshInterval, handleSessionExpired]);

    // ─── Cross-Tab Event Listener ─────────────────────────────────────────────────
    useEffect(() => {
        const channel = getBroadcastChannel();
        if (!channel) return;

        const handleMessage = (event) => {
            const { type, accessToken, refreshToken } = event.data;

            switch (type) {
                case "TOKEN_UPDATED":
                    console.log("📡 Received token update from another tab");
                    // Update local tokens
                    if (accessToken && refreshToken) {
                        igpsService.setTokens(accessToken, refreshToken);
                    }
                    break;

                case "SESSION_EXPIRED":
                    console.log("📡 Session expired in another tab");
                    handleSessionExpired();
                    break;

                case "LOGOUT":
                    console.log("📡 Logout triggered from another tab");
                    handleSessionExpired();
                    break;
            }
        };

        channel.addEventListener("message", handleMessage);

        return () => {
            channel.removeEventListener("message", handleMessage);
        };
    }, [handleSessionExpired]);

    // ─── Visibility Change Handler (refresh on tab focus) ───────────────────────
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                console.log("👁️ Tab became visible, checking session...");
                // Quick token check when tab regains focus
                const { accessToken } = getTokens();
                if (accessToken) {
                    // Token exists, verify it's still valid
                    doTokenRefresh();
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [getTokens, doTokenRefresh]);

    // ─── Login Function ───────────────────────────────────────────────────────────
    const login = async (email, password) => {
        setLoading(true);
        sessionCheckRetries.current = 0; // Reset retries

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

            // Use unified token setter
            setTokens(accessToken, refreshToken, true);

            setUser(user);
            setOrganization(organization || null);

            // Start refresh interval after successful login
            startRefreshInterval();

            return { success: true };

        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    // ─── Complete Login (after 2FA) ───────────────────────────────────────────────
    const completeLogin = async (accessToken, refreshToken) => {
        // Use unified token setter
        setTokens(accessToken, refreshToken, true);

        const profileRes = await igpsService.getProfile();

        if (profileRes.success) {
            setUser(profileRes.data.user);
            setOrganization(profileRes.data.organization || null);
            startRefreshInterval();
            return true;
        }

        return false;
    };

    // ─── Logout Function ─────────────────────────────────────────────────────────
    const logout = async () => {
        setLoading(true);
        stopRefreshInterval();

        try {
            await igpsService.logout();
        } catch (error) {
            console.error("Logout API failed:", error);
        }

        // Clear tokens everywhere
        igpsService.setTokens("", "");
        IgpsService.clearAllCaches();

        // Clear cookies
        deleteCookie("igps_token");
        deleteCookie("igps_refresh");

        // Clear localStorage
        removeLocalStorage(ACCESS_TOKEN_KEY);
        removeLocalStorage(REFRESH_TOKEN_KEY);

        // Clear state
        setUser(null);
        setOrganization(null);

        // Notify other tabs to logout
        const channel = getBroadcastChannel();
        if (channel) {
            channel.postMessage({ type: "LOGOUT" });
        }

        router.push("/igps/login");

        setLoading(false);
    };

    // ─── Refresh User ─────────────────────────────────────────────────────────────
    const refreshUser = async () => {
        try {
            const res = await igpsService.getProfile();
            if (res.success) {
                setUser(res.data.user);
                setOrganization(res.data.organization || null);
            }
        } catch (err) {
            console.error("Refresh user failed:", err);
        }
    };

    // ─── Manual Token Refresh (exposed for manual use) ──────────────────────────
    const refreshToken = async () => {
        await doTokenRefresh();
    };

    // ─── Checking the KYC Status  ──────────────────────────

    useEffect(() => {
        const fetchKYC = async () => {
            if (!user) return;

            try {
                const res = await igpsService.getKYCStatus();
                if (res.success) {
                    const remaining = res.data.remainingSteps || [];
                    const required = ["sender_details_submitted", "documents_uploaded", "ubo_submitted"];
                    const needsKyc = required.some(step => remaining.includes(step));

                    setKycStatus(needsKyc ? "incomplete" : "complete");
                } else {
                    setKycStatus("incomplete");
                }
            } catch {
                setKycStatus("incomplete");
            }
        };

        fetchKYC();
    }, [user]);

    return (
        <AuthContext.Provider value={{
            user,
            organization,
            loading,
            login,
            logout,
            igpsService,
            refreshUser,
            completeLogin,
            refreshToken,
            kycStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
