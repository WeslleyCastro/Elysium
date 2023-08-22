"use client"

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

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