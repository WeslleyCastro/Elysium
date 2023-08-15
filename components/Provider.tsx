"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"
import { DefaultSession } from "next-auth"

interface Session{
  children: ReactNode,
}

export const Provider = ({ children, session }: Session) => {
  return(
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}