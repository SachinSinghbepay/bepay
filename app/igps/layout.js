"use client";

import { AuthProvider } from "@/components/Dashboard-IGPS/context/AuthContext";

export default function IgpsLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
