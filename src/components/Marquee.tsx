'use client'

// SERVICES
import { useExchangeRate } from '@/context/ExchangeRateContext'

// ASSETS
import { MoreHorizontalIcon } from 'lucide-react'

export default function Marquee() {
  const { exchangeRate, isLoading } = useExchangeRate()

  return (
    <>
      {isLoading ? (
        <MoreHorizontalIcon className="animate-pulse h-6 w-6" />
      ) : (
        <div className="relative flex overflow-x-hidden">
          <div className="flex gap-2 animate-marquee whitespace-nowrap">
            {exchangeRate.slice(0, 5).map((item, index) => (
              <span
                key={index}
                className="flex gap-2 text-sm font-normal  mx-4"
              >
                <p className="uppercase text-slate-800">{item.symbol}</p>
                <p className="text-text-base">
                  US${' '}
                  {item.price
                    .toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                    .slice(1)}
                </p>
                {item.rate ? (
                  <p className="text-tertiary-700">
                    + {item.priceChange.toFixed(3)}
                  </p>
                ) : (
                  <p className="text-quartenary-700">
                    {item.priceChange.toFixed(3)}
                  </p>
                )}
              </span>
            ))}
          </div>

          <div className="flex gap-2 absolute animate-marquee2 whitespace-nowrap">
            {exchangeRate.slice(0, 5).map((item, index) => (
              <span
                key={index}
                className="flex gap-2 text-sm font-normal text-slate-500 mx-4"
              >
                <p className="uppercase text-slate-800">{item.symbol}</p>
                <p className="text-text-base">
                  US${' '}
                  {item.price
                    .toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                    .slice(1)}
                </p>
                {item.rate ? (
                  <p className="text-green-500">
                    + {item.priceChange.toFixed(3)}
                  </p>
                ) : (
                  <p className="text-red-500">{item.priceChange.toFixed(3)}</p>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
