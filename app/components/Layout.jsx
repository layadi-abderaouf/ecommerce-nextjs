"use client"
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
//components
import Sidebar from './Sidebar'
import { useState } from 'react'




export default function Layout({children}) {
  const [shownav, setshownav] = useState(false)
  const { data: session } = useSession()
  
  /*if(!session){
    return (
      <div className={'bg-yellow-700 w-screen h-screen flex items-center'} >
      <div className='text-center w-full ' >
        <button onClick={()=>signIn('google')} className='bg-white p-2 rounded-lg px-4' >login with google</button>
      </div>
      
     </div>
    )
  }*/
  function st(){
    
    setshownav(!shownav)
    
  }
  return (
   
    <div className='bg-yellow-700  min-h-screen'>
      <button className='text-white md:hidden' onClick={st} >
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>

      </button>
      <div className={' flex '} >
        <Sidebar show={shownav} />
      <div className='bg-white flex-grow mt-3 mr-3 mb-3 rounded-lg p-4 ' >{children}</div> 
     </div>
    </div>
    
   
  )
}
