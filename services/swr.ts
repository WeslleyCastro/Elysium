"use client"

import useSWR from 'swr'
import axios from 'axios'

export const getApi = (url: string) => {
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, isLoading, error } = useSWR(url, fetcher)
  
  return { data, isLoading, error }
}

export const getComments = (bookId: string) => {
  const url = `/api/books/${bookId}/comments`
  const fetcher = (url: string) => axios.get(url).then(res => res.data)
  const { data, isLoading, error } = useSWR(url, fetcher)
  
  return { data, isLoading, error }
}

export const deleteComment = async(bookId: string, commentId: string) => {
  const url = `/api/books/${bookId}/comments`
  await axios.delete(url , {data: {commentId: commentId}}).then(res => res.data)
}