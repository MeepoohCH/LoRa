"use client"

import React, { useState, useEffect } from 'react'
import Navbar from '../component/Navbar'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { data: session, status } = useSession();
    const router = useRouter();

    // ✅ ใช้ useEffect เพื่อ redirect หลังจาก render เสร็จ
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

        if (password !== confirmPassword) {
            setError("Password do not match");
            return;
        }

        if (!name || !email || !password || !confirmPassword) {
            setError("Please complete all inputs!");
            return;
        }

        try {
            const resCheckUser = await fetch("/register/checkUser", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const { user } = await resCheckUser.json();
            if (user) {
                setError("User already exists!");
                return;
            }

            const res = await fetch('/register/api', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            if (res.ok) {
                setError("");
                setSuccess("User registration successful!");
                
                // ✅ ใช้ setTimeout เพื่อ redirect หลังจากแสดงข้อความ success
                setTimeout(() => {
                    router.replace("/login");
                }, 1500);
            } else {
                setError("User registration failed.");
            }
        } catch (error) {
            console.error("Error during registration: ", error);
            setError("Something went wrong.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-center mb-6">Register Page</h3>
        <hr className="mb-6" />
        <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-500 text-white text-sm py-2 px-4 rounded-md">
                    {success}
                </div>
            )}

            <input
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="text"
                placeholder="Enter your name"
            />
            <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="email"
                placeholder="Enter your email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="password"
                placeholder="Enter your password"
            />
            <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                type="password"
                placeholder="Confirm your password"
            />
         <button  type="submit"
    className="w-full bg-[#002e6d] hover:bg-[#005BAC] text-white p-4 rounded-lg transition shadow-lg">
    Create account
    </button>

        </form>
        <hr className="my-6" />
        <p className="text-center">
            Already have an account?{' '}
            <Link className="text-blue-500 hover:underline" href="/login">
                Login
            </Link>{' '}
            Page
        </p>
    </div>
</div>

    );
}

export default RegisterPage;
