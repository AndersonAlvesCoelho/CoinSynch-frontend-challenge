'use client'

// IMPORTS
import Image from 'next/image'

// SERVICES
import { useExchangeRate } from '@/context/ExchangeRateContext'
import { useSystem } from '@/context/SystemContext'

// COMPONENTS
import { DialogAddCrypto } from '@/components/DialogAddCrypto'
import { DialogTrade } from '@/components/DialogTrade'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip'

export default function Home() {
  const { userCrypto, setTrade } = useExchangeRate()
  const { setIsOpenCloseTrade } = useSystem()

  return (
    <div className="container mx-auto w-full py-10 ">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="w-full lg:w-[592px] h-12 md:h-28 flex justify-between p-0">
            <CardContent className="w-full flex justify-center items-center gap-4 p-1.5">
              <div className=" bg-primary-100 p-1.5 md:p-4 rounded-full ">
                <Image
                  alt="Icon de  legal scale"
                  src="/icons/legal-scale.svg"
                  width={0}
                  height={0}
                  className="h-6 w-6 md:w-10 md:h-10"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <h1 className="text-text-base text-base md:text-2xl font-normal">
                  Balance in US$
                </h1>
                <p className="text-text-base text-sm font-normal hidden md:block">
                  (approximately)
                </p>
              </div>
            </CardContent>
            <CardContent className="flex justify-center items-center  w-full bg-quartenary-100">
              <p className="text-text-base text-base md:text-4xl pt-4 md:pt-0 font-bold">
                $32,256.56
              </p>
            </CardContent>
          </Card>
          <div className="flex  gap-8">
            <Card className="w-full md:w-full lg:w-72 h-36 md:h-28 flex flex-col md:flex-row justify-between p-0">
              <CardContent className="w-auto flex flex-col justify-between gap-1 p-2 pl-4">
                <h2 className="text-secondary-500 text-xs font-normal">
                  Daily Variation
                </h2>
                <div className=" flex flex-row md:flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <Image
                      alt="Icon de eth"
                      src="/icons/eth.svg"
                      width={0}
                      height={0}
                      className="h-4 w-4 md:w-6 md:h-6"
                    />
                    <p className="text-secondary-500 text-xs md:text-sm font-normal">
                      ETH
                    </p>
                  </div>
                  <p className="text-tertiary-700 text-xs md:text-sm font-normal">
                    +5,65%
                  </p>
                </div>
              </CardContent>

              <CardContent className="p-0 w-full md:w-52 lg:w-full h-full bg-[url('/images/graphic.png')] bg-no-repeat bg-cover"></CardContent>
            </Card>
            <Card className="w-full md:w-full lg:w-72 h-36 md:h-28 flex flex-col md:flex-row justify-between p-0">
              <CardContent className="w-full md:w-1/2 flex flex-col  gap-1 p-2 ">
                <h2 className="text-text-base text-sm font-bold">NFT’s NEWS</h2>
                <p className="text-secondary-500 text-xs font-normal">
                  New ElephantX NFT to be lauched!%
                </p>

                <Button
                  variant="link"
                  size="link"
                  className="hidden md:block text-primary-500 self-start"
                >
                  Read more +
                </Button>
              </CardContent>

              <CardContent className="p-0 w-full md:w-40 lg:w-full h-20 md:h-full bg-[url('/images/elephant.png')] bg-no-repeat bg-cover"></CardContent>
            </Card>
          </div>
        </div>

        <Card className="w-full h-full ">
          <CardHeader className="border-b flex flex-row justify-between">
            <CardTitle className="flex items-center gap-2 text-text-base text-2xl font-bold">
              <Image
                alt="Icon de  legal scale"
                src="/icons/wallet-crypto-currency-bitcoin.svg"
                width={0}
                height={0}
                className="h-6 w-6 md:w-8 md:h-8"
              />
              Card Title
            </CardTitle>

            <DialogAddCrypto />
          </CardHeader>
          <CardContent
            className={`${
              userCrypto.length !== 0
                ? ''
                : 'flex h-96 justify-center items-center'
            } p-0`}
          >
            {userCrypto.length !== 0 ? (
              <>
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Crypto</TableHead>
                        <TableHead>Holdings</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Trade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userCrypto.map((item, index) => (
                        <>
                          <TableRow
                            key={index}
                            className={
                              index % 2 === 0 ? 'bg-white' : 'bg-secondary-100'
                            }
                          >
                            <TableCell>
                              {(index + 1).toString().padStart(2, '0')}
                            </TableCell>
                            <TableCell className="flex items-center  gap-1">
                              <Image
                                alt={`Logo da(o) crypto ${item.name}`}
                                src={item.image}
                                width={32}
                                height={32}
                              />
                              <p className="text-text-base">{item.name}</p>
                              <p className="text-slate-500">{item.symbol}</p>
                            </TableCell>
                            <TableCell>
                              <p>
                                US${' '}
                                {item.price
                                  .toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                  })
                                  .slice(1)}
                              </p>
                              <p className="text-primary-500">
                                {item.value} {item.symbol}
                              </p>
                            </TableCell>
                            <TableCell>
                              {' '}
                              {item.rate ? (
                                <p className="text-tertiary-700">
                                  + {item.priceChange.toFixed(3)}
                                </p>
                              ) : (
                                <p className="text-quartenary-700 ">
                                  {item.priceChange.toFixed(3)}
                                </p>
                              )}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider data-right="true" key={index}>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Button
                                      type="button"
                                      variant="link"
                                      size="link"
                                      onClick={() => {
                                        setIsOpenCloseTrade(true)
                                        setTrade(item.name)
                                      }}
                                    >
                                      <Image
                                        src="/icons/trade.svg"
                                        alt="Icon de trade"
                                        width={24}
                                        height={24}
                                      />
                                    </Button>
                                    <DialogTrade />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-white font-normal text-sm">
                                      Transfer Crypto
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="grid md:hidden grid-cols-2 gap-4 p-4">
                  {userCrypto.map((item, index) => (
                    <>
                      <Card key={index} className="w-full p-0">
                        <CardHeader className="w-full bg-primary-100 p-0">
                          <CardTitle className="flex justify-center items-center gap-2 text-text-base text-xs p-4 px-10">
                            <Image
                              alt={`Logo da(o) crypto ${item.name}`}
                              src={item.image}
                              width={32}
                              height={32}
                            />
                            <p className="text-text-base">{item.name}</p>
                            <p className="text-slate-500">{item.symbol}</p>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-between">
                          <div className="flex flex-col gap-1">
                            <h2 className="text-secondary-200 text-xs">
                              Holdings
                            </h2>
                            <h1 className="text-text-base text-sm">
                              {' '}
                              US${' '}
                              {item.price
                                .toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                })
                                .slice(1)}
                            </h1>
                            <p className="text-primary-500">
                              {item.value} {item.symbol}
                            </p>
                          </div>
                          <hr />
                          <div className="flex flex-col gap-1">
                            <h2 className="text-secondary-200 text-xs">
                              Holdings
                            </h2>
                            {item.rate ? (
                              <p className="text-tertiary-700">
                                + {item.priceChange.toFixed(3)}
                              </p>
                            ) : (
                              <p className="text-quartenary-700 ">
                                {item.priceChange.toFixed(3)}
                              </p>
                            )}

                            <Button
                              type="button"
                              onClick={() => {
                                setIsOpenCloseTrade(true)
                                setTrade(item.name)
                              }}
                            >
                              Trade
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center ">
                <Image
                  alt="Icon de  empyt currency"
                  src="/images/empyt-currency.svg"
                  width={82}
                  height={64}
                />
                <h1 className="text-text-base text-xl font-bold">
                  Nothing here yet...
                </h1>
                <p className="text-text-base text-sm font-normal">
                  Add a crypto and start earning
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
