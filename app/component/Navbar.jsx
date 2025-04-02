import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <nav className='bg-[#333] text-white p-5'>
        <div className="container mx-auto"></div>
        <div className='flex justify-between items-center'>
            <div>
                <Link href="/">Home Page</Link>
            </div>
            <ul className='flex'>
                <li className='mx-3'><Link href="/login">Sign in</Link></li>
                <li className='mx-3'><Link href="/register">Register</Link></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar