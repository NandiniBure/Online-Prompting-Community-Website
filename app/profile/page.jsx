'use client'

import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'
const MyProfile = () => {
const {data:session}=useSession();
const [posts,setpost]=useState([])

    useEffect(()=>{
        const fetchPosts=async()=>{
          const response=await fetch(`/api/user/${session?.user.id}/posts`)

          const data=await response.json()
          console.log({data})
          setpost(data)
        }
        if(session?.user.id){
        fetchPosts();
      }
 },[session?.user.id])

    const handleEdit=async()=>{

    }

    const handleDelete=async()=>{
        
    }


  return (
   <Profile
    name='My Profile'
    desc='welcome to my profile'
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
   />
  )
}

export default MyProfile;