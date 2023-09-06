import Link from "next/link"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"

export const Footer = () => {
  return(
    <footer className="p-4 flex flex-col items-center justify-center mt-44 bg-zinc-900 w-full text-white gap-2">
        <div className="flex py-4 gap-4 items-center">
          <nav className="flex flex-col pr-4 border-r max-sm:gap-3">
            <Link className="hover:text-emerald-500" href="/">Home</Link>
            <Link className="hover:text-emerald-500" href="/share">Compartilhar</Link>
            <Link className="hover:text-emerald-500" href="/search?q=all">Todos os Livros</Link>
            <Link className="hover:text-emerald-500" href="/contact">Contate-nos</Link>
          </nav>
          <div className="flex gap-2 max-sm:gap-6">
            <a className="hover:scale-110 hover:text-emerald-500" 
            href="https://www.linkedin.com/in/weslley-castro-da-silva/" target="_blank">
              <AiFillGithub size={32}/>
            </a>
            
            <a className="hover:scale-110 hover:text-emerald-500" 
            href="https://github.com/WeslleyCastro" target="_blank">
              <AiFillLinkedin size={32}/>
            </a>
          </div>
        </div>
      <small>Weslley Castro © 2023</small>
      <a className="text-xs" href="https://storyset.com/people" target="_blank">People illustrations by Storyset</a>
    </footer>
  )
}