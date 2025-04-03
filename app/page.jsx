"use client"

import { useEffect } from 'react'; // เพิ่มการ import useEffect
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // เพิ่มการ import useRouter
import Navbar from './component/Navbar';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter(); // ใช้ useRouter สำหรับการเปลี่ยนเส้นทาง
  
  useEffect(() => {
    if (status === "authenticated") {
      // ตรวจสอบบทบาทผู้ใช้
      if (session.user.role === "admin") {
        router.replace("/admin/welcome");  // ถ้าเป็น admin ให้ไปที่ /admin/welcome
      } else {
        router.replace("/welcome");  // ถ้าเป็น user ให้ไปที่ /welcome
      }
    }
  }, [status, session, router]); // ตรวจสอบการเปลี่ยนแปลงของสถานะและ session

  return (
    <main>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar session={session} />
        <div className="flex flex-grow items-center justify-center px-6 py-12">
          <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-3xl sm:text-4xl font-semibold text-gray-800">
              Welcome to our platform 🚀
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mt-2">
              Explore our features by signing in or creating an account.
            </p>
            <hr className="my-6 border-gray-300" />
            <p className="text-gray-700 text-sm sm:text-lg leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis dolor quo ab nisi voluptate! Quam dicta beatae illum quis iusto dolores, nulla corporis explicabo voluptatibus dolor atque adipisci laboriosam voluptatum.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/login" className="bg-[#002e6d] hover:bg-[#005BAC] text-white py-3 px-6 rounded-lg text-lg transition shadow-md">
                Sign In
              </a>
              <a href="/register" className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg text-lg transition shadow-md">
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
