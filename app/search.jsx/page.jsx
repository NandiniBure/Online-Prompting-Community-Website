"use client"

import React from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'

const Search = () => {
    const Search=useSearchParams()
    const searchquery=Search ? Search.get('q') : null
  
    const encodedSearchQuery=encodeURI(searchquery || "")
    const {data,isLoading}=fetch(`/api/prompt?q=${encodedSearchQuery}`)

  return (
    <div>search</div>
  )
}

export default Search