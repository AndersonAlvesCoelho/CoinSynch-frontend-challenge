'use client'
// IMPORTS
import Image from 'next/image'
import { useEffect, useState } from 'react'

// SERVICES
import { PropsCryptoData, useExchangeRate } from '@/context/ExchangeRateContext'

// COMPONENTS
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { Button } from './ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
// ASSETS
import { Loader2Icon } from 'lucide-react'

export default function TopCryptos() {
  const { exchangeRate, isLoading } = useExchangeRate()

  const [offset, setOffset] = useState(5)
  const [listTab, setListTab] = useState<PropsCryptoData[]>([])

  const handleViewMore = () => {
    const result: PropsCryptoData[] = exchangeRate.slice(offset, offset + 5)
    setListTab((prevListTab) => [...prevListTab, ...result])
    setOffset((prevOffset) => prevOffset + 10)
  }

  const handleViewLess = () => {
    setListTab((prevListTab) => prevListTab.slice(0, prevListTab.length - 5))
    setOffset((prevOffset) => prevOffset - 5)
  }

  useEffect(() => {
    if (exchangeRate.length !== 0) setListTab(exchangeRate.slice(0, 5))
  }, [exchangeRate])

  return (
    <section id="top-cryptos" className="bg-white py-32">
      <div className="container mx-auto flex flex-col  gap-12">
        <h1 className="place-self-center text-lg md:text-3xl text-secondary-500 font-bold">
          Top Cryptos
        </h1>

        <div className="hidden md:block">
          <Table>
            <TableCaption>
              {exchangeRate.length !== 0 ? (
                <>
                  {isLoading ? (
                    <Loader2Icon className="h-6 w-6 animate-spin" />
                  ) : (
                    <Button
                      type="button"
                      className="text-primary-500"
                      onClick={() => {
                        listTab.length <= 5
                          ? handleViewMore()
                          : handleViewLess()
                      }}
                      variant="link"
                    >
                      {listTab.length <= 5 ? 'View more +' : 'View less -'}
                    </Button>
                  )}
                </>
              ) : (
                'Not even a crypto was found!'
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Crypto</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Trade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exchangeRate.length !== 0
                ? listTab.map((item, index) => (
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
                        US${' '}
                        {item.price
                          .toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })
                          .slice(1)}
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
                        <Button type="button" variant="tertiary">
                          Buy
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>

        <div className="block md:hidden">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col "
          >
            <div className="flex justify-between">
              <p className="text-text-base text-sm font-normal">Crypto</p>
              <p className="text-text-base text-sm font-normal">Trade</p>
            </div>

            {exchangeRate.length !== 0
              ? listTab.map((item, index) => (
                  <>
                    <AccordionItem value={`"item"-${index}`}>
                      <AccordionTrigger>
                        <span className="flex items-center gap-1">
                          <Image
                            alt={`Logo da(o) crypto ${item.name}`}
                            src={item.image}
                            width={32}
                            height={32}
                          />
                          <p className="text-text-base">{item.name}</p>
                          <p className="text-slate-500">{item.symbol}</p>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between">
                          <p className="text-text-base text-sm font-normal">
                            Price
                          </p>
                          US${' '}
                          {item.price
                            .toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            })
                            .slice(1)}
                        </div>
                        <div className="flex justify-between">
                          <p className="text-text-base text-sm font-normal">
                            Change
                          </p>
                          {item.rate ? (
                            <p className="text-tertiary-700">
                              + {item.priceChange.toFixed(3)}
                            </p>
                          ) : (
                            <p className="text-quartenary-700 ">
                              {item.priceChange.toFixed(3)}
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </>
                ))
              : null}
            {exchangeRate.length !== 0 ? (
              <>
                {isLoading ? (
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                ) : (
                  <Button
                    type="button"
                    className="text-primary-500 self-center"
                    onClick={() => {
                      listTab.length <= 5 ? handleViewMore() : handleViewLess()
                    }}
                    variant="link"
                  >
                    {listTab.length <= 5 ? 'View more +' : 'View less -'}
                  </Button>
                )}
              </>
            ) : (
              'Not even a crypto was found!'
            )}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
