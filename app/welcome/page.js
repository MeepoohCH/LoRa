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
    <div>
        <Navbar session={session}/>
        <div className='container mx-auto '>
        <h3 className='text-3xl my-3'>Welcome {session?.user?.name}</h3>
        <p>Email: {session?.user?.email}</p>
        <hr className='my-3'/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
        Vestibulum vitae justo id libero ultricies tincidunt. Donec sit amet nisi eget </p>
    </div>
    </div>
  )
}

export default WelcomePage