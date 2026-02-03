"use client";

import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  LogOut,
  Mail,
  MessageSquare,
  Menu,
  X,
  Users,
  Download,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, isAdmin, logout, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || !isAdmin())) {
      router.push("/admin/login");
    }
  }, [user, isAdmin, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("sidebar");
      if (
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        !event.target.classList.contains("sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return null;
  }

  // Add the Media Partners link to the navItems array
  const navItems = [
    {
      href: "/admin/dashboard",
      icon: <FileText className="h-5 w-5" />,
      label: "Blog Posts",
    },
    {
      href: "/admin/dashboard/new",
      icon: <Plus className="h-5 w-5" />,
      label: "New Post",
    },
    {
      href: "/admin/dashboard/subscribers",
      icon: <Mail className="h-5 w-5" />,
      label: "Newsletter Subscribers",
    },
    {
      href: "/admin/dashboard/contacts",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Contact Messages",
    },
    {
      href: "/admin/dashboard/get-started",
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Get Started",
    },
    {
      href: "/admin/dashboard/waitlist",
      icon: <Users className="h-5 w-5" />,
      label: "Waitlist",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9f9]">
      {/* Mobile Header */}
      <div className="md:hidden bg-[#f9f9f9] text-black p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">bepay Admin</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="sidebar-toggle p-2 rounded-md hover:bg-gray-800"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop (permanent) and Mobile (overlay) */}
        <div
          id="sidebar"
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:static top-0 left-0 z-40 h-full w-64 shadow-2xl bg-[#f9f9f9] text-black p-6 transition-transform duration-300 ease-in-out md:transition-none overflow-y-auto`}
          style={{
            marginTop: sidebarOpen ? "64px" : "0",
            height: sidebarOpen ? "calc(100% - 64px)" : "200vh",
          }}
        >
          <div className="mb-8 hidden md:block">
            <h1 className="text-xl font-bold">bepay Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Content Management</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 p-3 rounded hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-3 w-full text-left rounded hover:bg-gray-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 p-4 max-w-7xl mx-auto md:p-8 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
