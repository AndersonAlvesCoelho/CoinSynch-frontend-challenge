'use client'

// IMPORTS
import { StaticImageData } from 'next/image'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

// SERVICES
import axios from 'axios'

// COMPONENTS

interface PropsCoinData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any | null
  last_updated: string
}

interface PropsUserCrypto {
  name: string
  symbol: string
  price: number
  rate: boolean
  priceChange: number
  value: number
  image: StaticImageData
}

export interface PropsCryptoData {
  name: string
  symbol: string
  price: number
  rate: boolean
  priceChange: number
  image: StaticImageData
}

interface ExchangeRateContextData {
  exchangeRate: PropsCryptoData[]
  isLoading: boolean
  userCrypto: PropsUserCrypto[]
  trade: string
  handleAddCrypto: (crypto: string, value: number) => void
  handleTrade: (transfer: string, crypto: string, value: number) => void
  setTrade: (value: string) => void
}

interface Props {
  children: ReactNode
}

const ExchangeRateContext = createContext<ExchangeRateContextData>({
  exchangeRate: [],
  isLoading: false,
  userCrypto: [],
  trade: '',

  handleAddCrypto: () => {},
  handleTrade: () => {},
  setTrade: () => {},
})

function ExchangeRateProvider({ children }: Props) {
  const [exchangeRate, setExchangeRate] = useState<PropsCryptoData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userCrypto, setUserCrypto] = useState<PropsUserCrypto[]>([])
  const [trade, setTrade] = useState<string>('')

  const getCrypto = async () => {
    setIsLoading(true)
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'

    try {
      const response = await axios.get(url)
      const { status, data } = response
      if (status === 200 && data && data.length !== 0) {
        const result = data.map((item: PropsCoinData) => {
          return {
            name: item.name,
            symbol: item.symbol,
            price: item.current_price,
            rate: item.price_change_24h >= 0,
            priceChange: item.price_change_24h,
            image: item.image,
          }
        })
        setExchangeRate(result)
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error fetching market data:', error.message)
    }
  }

  const handleAddCrypto = (crypto: string, value: number) => {
    const result: PropsCryptoData[] = exchangeRate.filter(
      (item) => item.name === crypto,
    )

    if (result.length > 0) {
      const newCryptoData: PropsUserCrypto = {
        ...result[0], // Assume que o resultado é um único objeto
        value, // Adiciona a propriedade 'value' ao novo objeto
      }

      setUserCrypto((prevCrypto) => [...prevCrypto, newCryptoData])
    } else {
      console.error(`Cryptomoeda "${crypto}" não encontrada.`)
    }
  }

  const handleTrade = (transfer: string, crypto: string, value: number) => {
    const result: PropsUserCrypto[] = userCrypto.filter(
      (item) => item.name === crypto,
    )

    if (result.length !== 0) {
      const newCryptoData: PropsUserCrypto = {
        ...result[0],
        value:
          transfer === 'in' ? result[0].value + value : result[0].value - value,
      }

      // DELETA CRYPTO SER VALOR FOR OU MENOR
      setUserCrypto((prevCrypto) =>
        prevCrypto.filter((item) => item.name !== crypto && item.value > 0),
      )

      // ATUALIZANDO CRYPTO SE TIVER
      setUserCrypto((prevCrypto) =>
        prevCrypto.map((item) =>
          item.name === crypto ? { ...item, value: newCryptoData.value } : item,
        ),
      )
    } else {
      console.error(`Cryptomoeda "${crypto}" não encontrada.`)
    }
  }

  useEffect(() => {
    getCrypto()
  }, [])

  return (
    <ExchangeRateContext.Provider
      value={{
        exchangeRate,
        isLoading,
        userCrypto,
        trade,
        setTrade,
        handleAddCrypto,
        handleTrade,
      }}
    >
      {children}
    </ExchangeRateContext.Provider>
  )
}

const useExchangeRate = () => useContext(ExchangeRateContext)

export { ExchangeRateProvider, useExchangeRate }

