'use client'

// IMPORTS
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// SERVICES
import { useSystem } from '@/context/SystemContext'

// COMPONENTS
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
// ASSETS
import { LogOutIcon, MenuIcon } from 'lucide-react'

export default function HeaderDashboard() {
  const { isOpenCloseMenuDash, setIsOpenCloseMenuDash } = useSystem()
  const { push } = useRouter()

  return (
    <header className="w-full bg-white py-6 shadow-md sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Button
          onClick={() => setIsOpenCloseMenuDash(!isOpenCloseMenuDash)}
          variant="outline"
          size="link"
          type="button"
          className="block lg:hidden p-1.5"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>

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
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex gap-2  items-center">
            <Image
              src="https://fakeimg.pl/32"
              alt="Imagem de perfil do usuario"
              width={32}
              height={32}
              className="rounded-full"
            />
            Aulus
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Button
                type="button"
                variant="link"
                size="link"
                onClick={() => push('/')}
              >
                <LogOutIcon className="h-4 w-4" /> My Account
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
