'use client'

import {useEffect, useState} from 'react'
import { useRouter ,useSearchParams} from "next/navigation";
import { Form } from '@components/Form';

const UpdatePrompt = () => {
    const router=useRouter()
 
    const SearchParams=useSearchParams()
    const promptId=SearchParams.get('id'); 
 const [submitting,setsubmitting]=useState(false)

const [post,setpost]=useState({
    prompt:'',
    tag:''
})

useEffect(()=>{
 const getPromptDetails=async()=>{
    const response = await fetch(`/api/prompt/${promptId}`)
    const data=await response.json()
    setpost({
        prompt:data.prompt,
        tag:data.tag
    })
 }
 if(promptId){
    getPromptDetails();
 }
},[promptId])

const updatePrompt=async(e)=>{
e.preventDefault()
setsubmitting(true)
 if(!promptId){
    return alert('prompt ID not found')
 }
try{
const response=await fetch(`/api/prompt/${promptId}`,
{
   method:'PATCH',
   body: JSON.stringify({
    prompt:post.prompt,
    tag:post.tag
   })
})
if(response.ok){
    router.push("/");
}

}catch(error){
  console.log(error)
}finally{
    setsubmitting(false)
}

}
  return (
   <Form
    type='Create'
     post={post}
     setpost={setpost}
     submitting={submitting}
     handleSubmit={updatePrompt}
   />
  )
}

export default UpdatePrompt;