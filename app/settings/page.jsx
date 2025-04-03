"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/component/Navbar';

const Settings = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // เช็กว่า logout แล้วให้ redirect ไปหน้า login
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    // แสดง Loading ถ้า session กำลังโหลด
    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen"><span>Loading...</span></div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('The passwords do not match!');
            return;
        }

        setLoading(true);
        setMessage('');

        const updateData = {
            email: session?.user?.email,
            newPassword,
        };

        try {
            const res = await fetch('/api/update-user', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('Your password has been updated successfully!');
            } else {
                setMessage(data.error || 'Error updating password');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <Navbar session={session} />

            <div className="flex items-center justify-center py-12 px-6">
                <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-semibold text-gray-800 text-center">
                        Account Settings
                    </h3>
                    <p className="text-gray-600 text-center mt-2">
                        Update your password for security
                    </p>

                    <hr className="my-6 border-gray-300" />

                    {/* Message */}
                    {message && (
                        <div className={`mt-4 p-3 rounded-md text-white text-center ${message.includes("Error") ? 'bg-red-500' : 'bg-green-500'}`}>
                            {message}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-gray-700 font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={session?.user?.email || ''}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-gray-700 font-medium">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter new password"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Confirm new password"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className={`w-full bg-[#007BB5] hover:bg-[#005F8A] text-white py-3 rounded-lg text-lg font-medium transition-shadow shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Updating...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
