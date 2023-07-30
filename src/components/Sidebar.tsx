'use client'

import { useSystem } from '@/context/SystemContext'
import { MoveLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export default function Sidebar() {
  const { isOpenCloseMenuDash, setIsOpenCloseMenuDash } = useSystem()

  const navItem = [
    {
      img: '/icons/wallet-crypto-currency-bitcoin.svg',
      name: 'Lorem Ipsum',
    },
    {
      img: '/icons/crypto-currency.svg',
      name: 'Lorem Ipsum',
    },
    {
      img: '/icons/btc.svg',
      name: 'Lorem Ipsum',
    },
    {
      img: '/icons/line-chart.svg',
      name: 'Lorem Ipsum',
    },
  ]
  return (
    <>
      {isOpenCloseMenuDash && (
        <div className="fixed inset-0 z-10 bg-text-base/80 backdrop-blur-sm" />
      )}
      <aside
        className={`bg-white z-30 h-full overflow-y-auto fixed w-60 lg:w-20 pt-12 border-y hidden lg:block ${
          isOpenCloseMenuDash ? '!block' : ''
        }`}
      >
        <nav className="hidden lg:flex flex-col gap-8 items-center  ">
          {navItem.map((item, index) => (
            <>
              <TooltipProvider data-right="true" key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      alt={`Icon de  ${item.name}`}
                      src={item.img}
                      width={0}
                      height={0}
                      className="h-8 w-8"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-white font-normal text-sm">
                      {item.name}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ))}
        </nav>
        <nav className="flex lg:hidden flex-col gap-8 items-center  ">
          {navItem.map((item, index) => (
            <a
              href="#"
              key={index}
              className="inline-flex items-center gap-2 p-1.5 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <Image
                alt={`Icon de  ${item.name}`}
                src={item.img}
                width={0}
                height={0}
                className="h-8 w-8"
              />
              {item.name}
            </a>
          ))}

          <Button
            variant="outline"
            size="link"
            className="ml-8 self-start border-primary-500"
            onClick={() => setIsOpenCloseMenuDash(!isOpenCloseMenuDash)}
          >
            <MoveLeftIcon className="p-1.5 h-8 w-8 text-primary-500" />
          </Button>
        </nav>
      </aside>
    </>
  )
}
