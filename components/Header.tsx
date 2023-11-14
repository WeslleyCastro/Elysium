import Link from "next/link"
import { SearchBar } from "./SearchBar"
import Image from "next/image"
import { Dropdown } from "./Dropdown"

export const Header = () => {
  return(
    <header className="flex p-6 items-center justify-between sm:justify-evenly bg-white border-b-2 w-full fixed top-0 z-50">
      <Link href="/" className="hidden sm:block">
        <Image src="/images/elysium.svg" alt="Logo elysium" width={130} height={24}/>
      </Link>
      <SearchBar/>
      <Dropdown/>
    </header>
  )
}