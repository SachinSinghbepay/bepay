"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PageHeader from "@/components/global/page-header";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, login, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && isAdmin()) {
      router.push("/admin/dashboard");
    }
  }, [user, isAdmin, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setError(result.error || "Invalid login credentials");
        return;
      }

      if (email !== "info@bepay.money") {
        setError("You do not have admin privileges");
        return;
      }

      router.push("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex border-[1px] mx-auto w-[100px] border-black rounded-full p-6 justify-center">
              <Image
                src="/logo.png"
                alt="bepay money"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-black">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-black">
              Sign in to access the blog management dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className=" space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-full relative block w-full px-3 py-2 border border-black placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none  relative block w-full px-3 py-2 border rounded-full border-black placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="bg-black w-full cursor-pointer rounded-full border-[2px] border-black hover:bg-transparent hover:text-black text-white px-6 py-3 text-sm font-medium transition-colors"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
