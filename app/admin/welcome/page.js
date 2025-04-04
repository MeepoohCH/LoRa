"use client"

import React, { useEffect } from 'react';  // Import useEffect
import Navbar from '@/app/component/Navbar';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';  // Import useRouter
import Link from 'next/link';

function WelcomeAdminPage() {
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
        return <p>Loading...</p>;
    }

    return (
        
        <div className="flex flex-col min-h-screen">
  <Navbar session={session} />
  <div className="flex-grow flex items-center justify-center">
    <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-4xl font-semibold text-gray-800">
                Welcome, {session?.user?.name} 🎉
            </h3>
            <p className="text-gray-600 mt-2">
                  You are logged in as <span className="text-[#00aeef] font-semibold">Admin</span>
                </p>
            <p className="text-lg text-gray-600 mt-2">
                Email: <span className="font-medium text-[#00aeef]">{session?.user?.email}</span>
            </p>
            <hr className="my-6 border-gray-300" />
            <p className="text-gray-700 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vitae justo id libero ultricies tincidunt. Donec sit amet nisi eget tortor feugiat.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/dashboard" className="bg-[#002e6d] hover:bg-[#007BB5] text-white py-3 px-6 rounded-lg text-lg transition shadow-md">
                    Go to Dashboard
                </a>
                <a href="/settings" className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg text-lg transition shadow-md">
                    Settings
                </a>
            </div>
        </div>
    </div>
</div>
</div>

        
               
                
    
    
    );
}

export default WelcomeAdminPage;
