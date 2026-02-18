"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { IgpsService } from "../../../services/igpsService";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext();

const igpsService = new IgpsService();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Check session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                // If we have a token in cookies (checked by service), this should succeed
                // If not, it might fail or return 401
                const res = await igpsService.getProfile();
                if (res.success) {
                    // Handle wrapped response { user, organization }
                    if (res.data.user) {
                        setUser(res.data.user);
                        setOrganization(res.data.organization || null);
                    } else {
                        // Handle flat User response
                        setUser(res.data);
                        setOrganization(null);
                    }
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
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const res = await igpsService.login({ email, password });
            if (res.success) {
                // Store tokens in cookies (handled by service/login usually, or we do it here)
                // Service returns tokens, we need to set them if service doesn't auto-set cookie
                // The service.login returns AuthResponse.

                // In our updated service plan, we set cookies in refresh, let's verify login
                const { user, tokens, organization } = res.data;
                const { accessToken, refreshToken } = tokens;

                if (typeof window !== 'undefined') {
                    document.cookie = `igps_token=${accessToken}; path=/; max-age=86400`;
                    document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=604800`;
                }
                igpsService.setTokens(accessToken, refreshToken);

                setUser(user);
                setOrganization(organization || null);
                return { success: true };
            } else {
                return { success: false, error: res.error || res.message };
            }
        } catch (err) {
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);

        try {
            // Call backend logout (optional but good practice)
            await igpsService.logout();
        } catch (error) {
            console.error("Logout API failed:", error);
        }

        // 🔥 Clear service memory tokens
        igpsService.setTokens("", "");

        // 🔥 Delete cookies properly
        if (typeof window !== "undefined") {
            document.cookie = "igps_token=; path=/; max-age=0; SameSite=Strict";
            document.cookie = "igps_refresh=; path=/; max-age=0; SameSite=Strict";
        }

        // 🔥 Clear local React state
        setUser(null);
        setOrganization(null);

        // 🔥 Redirect to login
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
        <AuthContext.Provider value={{ user, organization, loading, login, logout, igpsService,  refreshUser, }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
