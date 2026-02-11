
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IgpsService } from '@/services/igpsService';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const igpsService = new IgpsService();

export default function IgpsLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await igpsService.login({ email, password });

            if (response.success) {
                // Store tokens (Basic implementation, ideally handle via HttpOnly cookies or secure storage context)
                const { accessToken, refreshToken } = response.data.tokens;

                // Using document.cookie for simple client-side persistence as per plan
                document.cookie = `igps_token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
                document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=86400; SameSite=Strict`;

                // Also set on service instance if it persists in a Context (not yet implemented, so just for current scope)
                igpsService.setTokens(accessToken, refreshToken);

                router.push('/igps/dashboard'); // Assuming dashboard will be here
            } else {
                setError(response.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full font-sans">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                {/* Background Image Placeholder */}
                <div className="absolute inset-0 bg-gray-900">
                    {/* Replace with actual image asset when available */}
                    {/* <Image src="/path/to/image.jpg" alt="Login Visual" fill className="object-cover opacity-60" /> */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80"></div>
                </div>

                <div className="relative z-10 p-12 max-w-lg">
                    <h1 className="text-5xl font-extrabold text-white leading-tight tracking-tight">
                        MOVE MONEY <br />
                        GLOBALLY. <br />
                        <span className="text-lime-400">INSTANTLY.</span>
                    </h1>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-left space-y-2">
                        <div className="flex justify-between items-center mb-6">
                            <div className="font-bold text-2xl tracking-tighter">bepay <span className="font-light">IGPS</span></div>
                            {/* <Image src="/logo.png" alt="Logo" width={100} height={30} /> */}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Login to your bepay IGPS account</h2>
                        <p className="text-gray-500">Welcome back! Please enter your details.</p>
                    </div>

                    {/* Social Login */}
                    <div>
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                            onClick={() => alert('Google login integration pending')}
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </button>
                    </div>

                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400 pr-10"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-black hover:text-gray-800 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/igps/signup" className="font-bold text-black hover:underline">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
