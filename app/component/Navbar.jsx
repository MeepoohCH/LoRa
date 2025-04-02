"use client"

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Navbar({ session }) {
  
  return (
    <nav className='bg-[#333] text-white p-5'>
        <div className="container mx-auto"></div>
        <div className='flex justify-between items-center'>
            <div>
                <Link href="/">Home Page</Link>
            </div>
            <ul className='flex'>
              {!session? (
                <>
                 <li className='mx-3'><Link href="/login">Sign in</Link></li>
                 <li className='mx-3'><Link href="/register">Register</Link></li>
                 </>
              ):(
                <>
                <li className='mx-3'><a href="/welcome"  className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Profile</a></li>
                <li className='mx-3'><a onClick={() => signOut()} className='bg-red-500 text-white border py-2 px-3 rounded-md text-lg my-2'>Log out</a></li>
                </>
                 )}
               
                
            </ul>
        </div>
    </nav>
  )
}

export default Navbar