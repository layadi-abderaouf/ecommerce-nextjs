"use client"

import { useSession } from 'next-auth/react'
//components
import Layout from '../components/Layout'



export default function Home() {
  const { data: session } = useSession()
  return (
   <Layout>
    <div className='text-green-900 flex justify-between' >
      <h1>hello , {session?.user.name}</h1>
      <div className='flex bg-gray-300 p-2 rounded-lg items-center' >
        <img className='h-9 w-9 rounded-full mr-1' src={session?.user.image} alt="" />
        <span className='px-2 py-1' >
          <h1> {session?.user.name}</h1>
        </span>
        
      </div>
     
    </div>
   
   </Layout>
  )
}
