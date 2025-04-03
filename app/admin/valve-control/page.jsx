"use client"

import React, { useEffect } from 'react';  // Import useEffect
import Navbar from '@/app/component/Navbar';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';  // Import useRouter
import Link from 'next/link';

function ControlPage() {

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

  return (
    <div>
     <Navbar session={session} />
        <div>
            Valva Contro Page
        </div>
    </div>
  )
}

export default ControlPage