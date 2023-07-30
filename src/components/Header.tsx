'use client'

// IMPORTS
import Image from 'next/image'
import { useState } from 'react'

// COMPONENTS
import Marquee from './Marquee'
import { Button } from './ui/button'

// ASSETS
import { MenuIcon } from 'lucide-react'
import { DialogSignIn } from './DialogSignIn'
import { DialogSignUp } from './DialogSignUp'

export default function Header() {
  const [toggleResponsive, setToggleResponsive] = useState(true)

  return (
    <header className="w-full bg-white py-6 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <a href="/" className="mr-4">
            <Image
              className="hover:scale-105 transition duration-700 ease-in-out"
              src="/images/logo.png"
              width={124}
              height={21}
              alt="Logo"
            />
          </a>
          <nav className="hidden md:flex items-center gap-6 ">
            <a
              href="#about"
              className="text-sm font-normal text-slate-500 hover:text-slate-900 hover:scale-105 transition duration-700 ease-in-out"
            >
              About us
            </a>
            <a
              href="#top-cryptos"
              className="text-sm font-normal text-slate-500 hover:text-slate-900 hover:scale-105 transition duration-700 ease-in-out"
            >
              Top Cryptos
            </a>
          </nav>
        </div>

        <div className="hidden md:flex gap-6">
          <div className="hidden lg:flex justify-center items-center gap-2 w-96 ">
            <Marquee />
          </div>

          <DialogSignIn />
          <DialogSignUp />
        </div>

        <Button
          onClick={() => setToggleResponsive(!toggleResponsive)}
          variant="link"
          type="button"
          className="block md:hidden"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex lg:hidden justify-center items-center gap-2 mt-4">
        <div className="w-full md:w-96 ">
          <Marquee />
        </div>
      </div>

      {/* mobile menu  */}
      {!toggleResponsive ? (
        <nav className="md:hidden flex flex-col items-start gap-9 px-8 py-10 w-full bg-white  z-20">
          <a
            href="#about"
            onClick={() => setToggleResponsive(true)}
            className="text-sm font-normal text-slate-500 hover:text-slate-900 hover:scale-105 transition duration-700 ease-in-out"
          >
            About us
          </a>
          <a
            href="#top-cryptos"
            onClick={() => setToggleResponsive(true)}
            className="text-sm font-normal text-slate-500 hover:text-slate-900 hover:scale-105 transition duration-700 ease-in-out"
          >
            Top Cryptos
          </a>

          <DialogSignIn />
          <DialogSignUp />
        </nav>
      ) : null}
    </header>
  )
}
