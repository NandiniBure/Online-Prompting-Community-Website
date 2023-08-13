"use client"

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState,useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
const Nav = () => {

const {data:session}=useSession()
const[provider,setprovider]=useState(null)
const [toggleDropdown,setroggleDropdown]=useState(false)
useEffect(()=>{
 const setProviders=async()=>{
 const response=await getProviders();
 setprovider(response)
}
setProviders()
},[])

  return (
    <nav className='flex-between w-full mb-16
    pt-3'>
    <Link href="/" className='flex gap-2
    flex-center'>
        <Image
            src="/assets/images/logo.svg"
            alt='promoptopia logo'
            width={30}
            height={30}
            className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
    </Link>
{/* Desktop Navigation */}
<div className='sm:flex hidden'>
 {session?.user ? (
    <div className='flex gap-3 md:gap-5'>
        <Link href='/create-prompt' 
        className='black_btn'>
Create Post
        </Link>
    <button type='button' onClick={signOut}
    className='outline_btn'>
 signOut
    </button>

<Link href='/profile'>
<Image
    src={session?.user.image}
    width={37}
    height={37}
    className='rounde-full'
    alt='profile'
/>
</Link>

    </div>
 ):(
 <>
{
    provider && 
    Object.values(provider).map((provider)=>(
       <button
        type='button'
        key={provider.name}
        onClick={()=>signIn(provider.id)}
        className='black_btn'>
     sign In
       </button> 
    ))
}
 </>   
 )
 }
</div>    
 {/* mobile Navigation */}
   <div className='sm:hidden flex relative'>
    {
       session?.user ? (
<div className='flex'>
<Image
    src={session?.user.image}
    width={37}
    height={37}
    className='rounde-full'
    alt='profile'
    onClick={()=>
    setroggleDropdown((prev)=>
    !prev
    )
    }
/>  

{toggleDropdown && (
 <div className='dropdown'>
 <Link href="/profile"
 className='dropdown_like'
 onClick={()=>setroggleDropdown(false)}>
My Profile
 </Link>
 <Link href='/create-prompt'
 className='dropdown_like'
 onClick={()=>setroggleDropdown(false)}>
Create Prompt
 </Link>
<button type='button'
onClick={()=>{
   setroggleDropdown(false) 
   signOut()
}}
className='mt-5 w-full black_btn'>
    signOut
</button>
 </div>   
) }
</div>
        ):(
            <>
            {
    provider && 
    Object.values(provider).map((provider)=>(
       <button
        type='button'
        key={provider.name}
        onClick={()=>signIn(provider.id)}
        className='black_btn'>
     sign In
       </button> 
    ))
}
</>
        )

    }
   </div>
    </nav>
  )
}

export default Nav