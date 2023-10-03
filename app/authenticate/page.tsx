"use client"

import { LoginForm } from "@/components/LoginForm"
import { RegisterForm } from "@/components/RegisterForm"
import { useState } from "react"

export default function Authenticate(){
  const [loginOrRegister, setLoginOrRegister] = useState<"login" | "register">("login")

  return(
    <section className="flex justify-center items-center h-full">
      <div className="display flex items-center justify-evenly w-full">
        <img className="hidden lg:block w-1/3" src="/images/authentication.svg" alt=""/>

        {loginOrRegister == "login" ? ( 
          <LoginForm state={setLoginOrRegister}/>
        ) : (
          <RegisterForm state={setLoginOrRegister}/>
        )}
      </div>
    </section>
  )
} 

