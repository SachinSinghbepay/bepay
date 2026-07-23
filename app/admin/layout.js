import { AuthProvider } from "@/lib/auth";

export default function AdminLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
