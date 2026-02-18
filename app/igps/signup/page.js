
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IgpsService } from '@/services/igpsService';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const igpsService = new IgpsService();

export default function IgpsSignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        organizationName: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Auto-generate slug from org name for now (backend might handle duplicate checks)
            const organizationSlug = formData.organizationName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');

            const response = await igpsService.signup({
                ...formData,
                organizationSlug: organizationSlug || `org-${Date.now()}` // Fallback if name is empty (shouldn't happen due to required)
            });

            if (response.success) {
                // Automatically log the user in by setting tokens
                const { accessToken, refreshToken } = response.data.tokens;

                document.cookie = `igps_token=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
                document.cookie = `igps_refresh=${refreshToken}; path=/; max-age=86400; SameSite=Strict`;

                igpsService.setTokens(accessToken, refreshToken);

                // Redirect to Onboarding
                router.push('/igps/onboarding');
            } else {
                setError(response.message || 'Signup failed. Please try again.');
                // If error mentions slug, maybe append something random and retry? 
                // For now, just showing the error.
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
            {/* Left Side - Visual (Same as Login) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gray-900">
                    {/* Replace with actual image asset when available */}
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

            {/* Right Side - Signup Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-white p-8 overflow-y-auto">
                <div className="w-full max-w-md space-y-8 my-auto">
                    {/* Header */}
                    <div className="text-left space-y-2">
                        <div className="flex justify-between items-center mb-6">
                            <div className="font-bold text-2xl tracking-tighter">bepay <span className="font-light">IGPS</span></div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
                        <p className="text-gray-500">Start moving money globally with zero fees.</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSignup}>
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    placeholder="John"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="john@company.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                            <input
                                id="organizationName"
                                name="organizationName"
                                type="text"
                                required
                                placeholder="Acme Corp"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400"
                                value={formData.organizationName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    placeholder="Create a strong password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-400 pr-10"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={8}
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Social Signup */}
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or join with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        onClick={() => alert('Google signup integration pending')}
                    >
                        <FcGoogle className="text-xl" />
                        Google
                    </button>


                    <div className="text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link href="/igps/login" className="font-bold text-black hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
