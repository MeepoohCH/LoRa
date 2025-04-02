"use client"

import React, {useState} from 'react'
import Navbar from '../component/Navbar'
import Link from 'next/link'

function LoginPage() {
  return (
    <div>
        <Navbar/>
        <diV className = 'container mx-auto py-5'>
            <h3>Login Page</h3>
            <hr className='my-3'/>
            <form action="">
                <input className='block bg-gray-300 p-2 my-2 rounded-md' type="/email" placeholder='Enter your email'/>
                <input className='block bg-gray-300 p-2 my-2 rounded-md' type="/password" placeholder='Enter your password'/>
                <button type='submit' className='bg-green-500 p-2 rounded-md text-white'>Sign in</button>
            </form>
            <hr className='my-3'/>
            <p>Already have and account? go to <Link className='text-blue-500 hover:underline' href="/register">Register</Link> Page</p>
        </diV>
    </div>
  )
}

export default  LoginPage