// IMPORTS
import Image from 'next/image'

// COMPONENTS
import { Button } from './ui/button'

// ASSETS
import { MoveRightIcon } from 'lucide-react'

export default function Hero() {
  return (
    <div className="container mx-auto px-4 md:px-8 mt-20 z-10">
      <section className="flex flex-col justify-center  md:justify-between gap-6  md:gap-16 md:flex-row">
        <div className="flex flex-col justify-center items-center  gap-6  w-full md:w-5/12">
          <h1 className="font-bold  text-xl md:text-5xl text-primary-500">
            Lorem ipsum dolor sit amet, consectetur
          </h1>
          <p className="font-normal text-sm md:text-xl text-secondary-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>

          <Button size="lg">
            SIGN UP NOW
            <MoveRightIcon className="mrl-2 h-4 w-4" />
          </Button>

          <div className="flex gap-8 place-self-center md:place-self-start">
            <Button className="rounded-md" variant="ghost">
              Cryptos
            </Button>
            <Button className="rounded-md" variant="ghost">
              NFTs
            </Button>
            <Button className="rounded-md" variant="ghost">
              Games
            </Button>
          </div>
        </div>

        <div className="hidden md:flex justify-start items-start overflow-hidden w-5/12">
          <Image
            alt="Icon da logo do BTC"
            src="/icons/btc.svg"
            width={64}
            height={64}
            className="p-1.5 bg-primary-100 rounded-md mt-16 shadow-xl"
          />

          <div className="flex justify-end items-end">
            <Image
              alt="Imagem de uma  mulher segurando um tablet"
              src="/images/carrousel-1.png"
              width={384}
              height={500}
              className="z-10"
            />
            <div className="bg-primary-500 h-[420px] w-64 absolute" />

            <Image
              alt="Icon de um grafico de linha crescente"
              src="/icons/line-chart.svg"
              width={64}
              height={64}
              className="p-1.5 bg-primary-100 rounded-md shadow-xl absolute mb-28 mr-0 md:-mr-10 z-20"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
