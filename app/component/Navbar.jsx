"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // ไม่ต้องเปลี่ยนจากเดิม
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { FaCog, FaChartLine, FaMap, FaListAlt, FaBars, FaTimes, FaFaucet, FaUserAlt, FaSignOutAlt, FaChevronDown, FaChevronUp, FaClipboardList } from 'react-icons/fa';

function Navbar({ session }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const isAdmin = session?.user?.role === 'admin';
  const pathname = usePathname();
  // ใช้ useState เพื่อจัดเก็บ pathname
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // ใช้ router.asPath หรือ window.location.pathname ตามที่ต้องการ
    setCurrentPath(router.asPath); // ใช้ asPath แทน pathname
  }, [router.asPath]); // เมื่อ path เปลี่ยนจะ update state

  return (
    <nav className="py-1 px-4 shadow-md bg-[#ffffff]">
      <div className="container mx-auto flex justify-between items-center ">
        {/* โลโก้มิตรผล */}
        <div>
          <Link href="/">
            <img
              src="/logo-mitrphol.png"
              alt="Mitr Phol Logo"
              className="h-12 w-auto hover:opacity-80 transition"
            />
          </Link>
        </div>

           {/* เมนู */}
           {session && (
          <div className="hidden lg:flex items-center space-x-12 bg-[#ffffff] rounded-3xl py-4 px-6">
            <ul className="flex space-x-12 text-lg text-[#002e6d]">
              {[
                { name: "Overview", path: "/overview", icon: <FaListAlt className="h-5 w-5 " /> },
                { name: "Graph", path: "/graph", icon: <FaChartLine className="h-5 w-5" /> },
                { name: "Map & Node", path: "/map", icon: <FaMap className="h-5 w-5" /> },
                ...(isAdmin ? [{ name: "Valve Control", path: "/admin/valve-control", icon: <FaFaucet className="h-5 w-5" /> }] : []),
              ].map((item) => {
                const isActive = pathname === item.path;  // ใช้ pathname เพื่อเช็คว่าตรงกับ path หรือไม่
                return (
                  <li key={item.path}>
                   <Link
  href={item.path}
  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition duration-200 ease-in-out ${
    // ถ้าเป็นหน้า active (ตรงกับ pathname)
    isActive
      ? item.name === "Valve Control"
        ? "bg-orange-500 text-[#ffffff] hover:border-[#FFCC00]" // ถ้า active ให้เป็น bg-orange text-white
        : "bg-[#002e6d] text-[#ffffff] border-2 border-[#002e6d] shadow-md" // กรณี active อื่นๆ
      : item.name === "Valve Control"
      ? "bg-yellow-300 text-[#002e6d] hover:border-[#FFCC00]" // ถ้าไม่ active ให้เป็น bg-yellow
      : "hover:bg-[#002e6d] hover:text-[#ffffff] text-[#002e6d] hover:border hover:border-[#007BB5] transition-all"
  }`}
>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* เมนูด้านขวา */}
        <ul className="hidden lg:flex items-center space-x-6">
          {!session ? (
            <>
              <li><Link href="/login" className="text-lg text-[#002e6d] font-semibold hover:text-[#005BAC] transition">Sign in</Link></li>
              <li><Link href="/register" className="bg-[#002e6d] hover:bg-[#005BAC] text-white font-semibold py-2 px-5 rounded-full text-lg transition shadow-md">Register</Link></li>
            </>
          ) : (
            <>
              {/* User Dropdown */}
              <li className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 border-1 border-[#002e6d]/80 bg-[#ffffff] hover:bg-[#f2f9ff] text-[#002e6d] font-semibold py-2 px-3 rounded-4xl text-lg transition shadow-md">
                  <div className="p-2 bg-[#002e6d] rounded-full">
                    <FaUserAlt className="h-5 w-5 text-[#ffffff]" />
                  </div>
                  <div className="ml-2 text-sm">
                    <span className="block text-left">{session?.user?.name}</span>
                    <span className="block font-medium text-xs text-[#002e6d]">
                      {isAdmin ? 'Head Admin' : session?.user?.email}
                    </span>
                  </div>
                  {dropdownOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-[#ffffff] bg-opacity-90 shadow-lg rounded-lg w-48 border border-[#ddd]">
                    <ul className="py-2 rounded-lg">
                      {isAdmin && (
                        <li>
                          <Link href="/admin/dashboard" className="block w-full px-4 py-2 text-[#002e6d] hover:bg-gray-100">
                            <FaClipboardList className="inline-block mr-2" /> Admin Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link href="/settings" className="block w-full px-4 py-2 text-[#002e6d] hover:bg-gray-100">
                          <FaCog className="inline-block mr-2" /> Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => signOut()}
                          className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                          <FaSignOutAlt className="inline-block mr-2" /> Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        {/* ปุ่ม Hamburger สำหรับหน้าจอเล็ก */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#002e6d] text-2xl hover:text-[#007BB5] transition">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* เมนูสำหรับหน้าจอเล็ก */}
      <div className={`${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} lg:hidden overflow-hidden transition-all duration-300`}>
        <ul className="flex flex-col items-center space-y-4 mt-4 bg-[#E3F2FD] p-6 rounded-lg shadow-md">
          {session && (
            <>
              <li className="flex items-center space-x-2">
                <FaListAlt className="text-[#002e6d] h-5 w-5" />
                <Link href="/overview" className="hover:text-[#007BB5] text-[#002e6d] transition">Overview</Link>
              </li>
              <li className="flex items-center space-x-2">
                <FaChartLine className="text-[#002e6d] h-5 w-5" />
                <Link href="/graph" className="hover:text-[#007BB5] text-[#002e6d] transition">Graph</Link>
              </li>
              <li className="flex items-center space-x-2">
                <FaMap className="text-[#002e6d] h-5 w-5" />
                <Link href="/map" className="hover:text-[#007BB5] text-[#002e6d] transition">Map & Node</Link>
              </li>
              {isAdmin && (
                <li className="flex items-center space-x-2">
                  <FaFaucet className="text-[#002e6d] h-5 w-5" />
                  <Link href="/admin/valve-control" className="hover:text-[#007BB5] text-[#002e6d] transition">Valve Control</Link>
                </li>
              )}
            </>
          )}
          {!session ? (
            <>
              <li><Link href="/login" className="text-lg text-[#007BB5] font-semibold hover:text-[#002e6d] transition">Sign in</Link></li>
              <li><Link href="/register" className="bg-[#007BB5] hover:bg-[#005BAC] text-white font-semibold py-2 px-5 rounded-full text-lg transition shadow-md">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link href="/settings" className="flex items-center space-x-2 bg-[#007BB5] hover:bg-[#007BB5] text-white font-semibold py-2 px-5 rounded-full text-lg transition shadow-md">
                <FaCog className="h-5 w-5" />
                <span>Settings</span>
              </Link></li>
              <li><button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full text-lg transition shadow-md">Log out</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
