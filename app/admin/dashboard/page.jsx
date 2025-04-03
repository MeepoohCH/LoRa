"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/component/Navbar';

const AdminDashboard = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [message, setMessage] = useState('');
    const { data: session, status } = useSession();
    const router = useRouter();

    //  เช็กว่าถ้า logout ให้ redirect ไปหน้า login
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");  // ใช้ replace() ป้องกัน redirect loop
        }
    }, [status, router]);

    //  แสดง Loading ถ้า session กำลังโหลด
    if (status === "loading") {
        return <div className="flex justify-center items-center h-screen"><span>loading...</span></div>;
    }

    const handlePromote = async () => {
        if (!email) {
            setMessage("กรุณากรอกอีเมล์ของผู้ใช้");
            return;
        }
        if (!session?.user?.email) {
            setMessage("Unauthorized: No user found in session");
            return;
        }

        try {
            const response = await fetch("/api/promote-to-admin", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.user.email}`
                },
                credentials: "include",
                body: JSON.stringify({ email, role })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(`User's role changed to ${role}`);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage("เกิดข้อผิดพลาดในการเปลี่ยนบทบาทผู้ใช้");
        }
    };

    return (
        <div>
            <Navbar session={session}/>
            <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
                        <p className="text-lg text-gray-600 mt-2">Manage user roles and permissions</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email of User</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter email of user"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handlePromote}
                                className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition"
                            >
                                Change Role
                            </button>
                        </div>

                        {message && (
                            <div className={`mt-4 p-3 rounded-md text-white ${message.includes("Error") ? 'bg-red-500' : 'bg-green-500'}`}>
                                {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
