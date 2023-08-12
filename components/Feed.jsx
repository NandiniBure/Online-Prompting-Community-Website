'use client'

import {useState,useEffect}from 'react'
import PromptCart from './PromptCart'

const PromptCartList=({data,handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCart
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {
  const [searchText,setseatchText]=useState('')
  const [post,setpost]=useState([])
  const handlesearchchange=(e)=>{

  }

  useEffect(()=>{
const fetchPosts=async()=>{
  const response=await fetch('/api/prompt')
  const data=await response.json()

  setpost(data)
}
fetchPosts();
  },[])
  
  return (
    <section className='feed'>
      <from className="relative w-full flex-center ">
     <input
      type='text'
      placeholder='search for tags or a username'
      value={searchText}
      onClick={handlesearchchange}
      required
      className='search_input peer'
     />
      </from>

      <PromptCartList
        data={post}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed