"use client"


import Navbar from "./component/Navbar";
import { useSession } from 'next-auth/react'

export default function Home() {

 const { data: session } = useSession();
  

  return (
  <main>
    <Navbar session={session}/>
    <div className="container mx-auto">
      <h3>Welcome to home page</h3>
      <hr className="my-3"></hr>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis dolor quo ab nisi voluptate! Quam dicta beatae illum quis iusto dolores, nulla corporis explicabo voluptatibus dolor atque adipisci laboriosam voluptatum.</p>
    </div>
  </main>
      
  );
}
