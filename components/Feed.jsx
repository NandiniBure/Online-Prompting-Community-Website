'use client'

import {useState,useEffect}from 'react'
import PromptCart from './PromptCart'
import { useRouter } from 'next/navigation'


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
  const [searchedResults, setSearchedResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return post.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tagName) => {
   setseatchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handlesearchchange=(e)=>{
    clearTimeout(searchTimeout);
    setseatchText(e.target.value)
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
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
      <form className="relative w-full flex-center "
       >
     <input
      type='text'
      placeholder='search for tags or a username'
      value={searchText}
      onChange={handlesearchchange}
      required
      className='search_input peer'
     />
      </form>

 { searchText ? (
  <PromptCartList
    data={searchedResults}
    handleTagClick={handleTagClick}
  />
 ):
  (<PromptCartList
        data={post}
        handleTagClick={handleTagClick}  
      />
      )}
    </section>
  )
}

export default Feed