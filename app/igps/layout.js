import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/components/Dashboard-IGPS/context/AuthContext";

export default function IgpsLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  );
}
