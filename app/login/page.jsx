"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../component/Navbar'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            if (session?.user?.role === "admin") {
                router.replace("/admin/welcome");
            } else {
                router.replace("/welcome");
            }
        }
    }, [session, status, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false, // ป้องกัน NextAuth redirect เอง
            });

            if (res.error) {
                setError("Invalid credentials");
                return;
            }

            // Reload session หลัง login สำเร็จ
            window.location.reload();
        } catch (error) {
            console.log(error);
            setError("Something went wrong");
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 ">
        <h3 className="text-2xl font-semibold text-center mb-4">Login Page</h3>
        <hr className="mb-4" />
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md">
                    {error}
                </div>
            )}
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                type="email"
                placeholder="Enter your email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                type="password"
                placeholder="Enter your password"
            />
            <button type="submit" className="w-full bg-[#002e6d] hover:bg-[#005BAC] text-white p-3 rounded-md transition">
                Sign in
            </button>
        </form>
        <hr className="my-4" />
        <p className="text-center">
            Don't have an account?{' '}
            <Link className="text-blue-500 hover:underline" href="/register">
                Register 
            </Link> {' '}
             Page
        </p>
    </div>
</div>
    );
}

export default LoginPage;
