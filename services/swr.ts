"use client"

import useSWR from 'swr'
import axios from 'axios'

export const getApi = (url: string) => {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, isLoading, error } = useSWR(url, fetcher)
  
  return { data, isLoading, error }
}

// export const postApi = (url: string, data: any) => {
//   const fetcher = (url: string) => axios.post(url, {
//     data
//   })
//   const { isLoading, error} = useSWR(url, fetcher)

//   return {
//     isLoading,
//     error,
//   }
// }