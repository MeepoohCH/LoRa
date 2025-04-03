"use client"

import React from 'react'
import Navbar from '../component/Navbar'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

function WelcomePage() {

  const { data: session } = useSession();
  console.log(session)

  if (!session) redirect("/login");

  return (
<div className="flex flex-col min-h-screen">
  <Navbar session={session} />
  <div className="flex-grow flex items-center justify-center">
    <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-4xl font-semibold text-gray-800">
                Welcome, {session?.user?.name} 🎉
            </h3>
            <p className="text-lg text-gray-600 mt-2">
                Email: <span className="font-medium text-[#007BB5]">{session?.user?.email}</span>
            </p>
            <hr className="my-6 border-gray-300" />
            <p className="text-gray-700 text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vitae justo id libero ultricies tincidunt. Donec sit amet nisi eget tortor feugiat.
            </p>

            <div className="mt-8 flex justify-center space-x-4">
            <a href="/overview" className="bg-[#0097DA] hover:bg-[#007BB5] text-white py-3 px-6 rounded-lg text-lg transition shadow-md">
               Go to Overview
                </a>

                <a href="/settings" className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg text-lg transition shadow-md">
                    Settings
                </a>
            </div>
        </div>
    </div>
</div>
</div>

  )
}

export default WelcomePage