// layout.jsx — just a plain Next.js layout shell, no state here.
// All routing state lives in page.jsx which is a single "app" component.
// This file only exists because Next.js requires it for the /blogdashboard segment.

export default function BlogDashboardLayout({ children }) {
  return <>{children}</>;
}