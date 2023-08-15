"use client"
import { useSearchParams } from "next/navigation"

export default function UserBook(){

  const searchParams = useSearchParams()
  const params = searchParams.get("q")



  return(
    <div>
      <h1>User Book</h1>
    </div>
  )
}