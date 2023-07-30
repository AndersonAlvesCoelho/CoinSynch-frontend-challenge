'use client'

// IMPORTS
import { ReactNode, createContext, useContext, useState } from 'react'

interface PropsSystemContext {
  isOpenCloseSignUp: boolean
  isOpenCloseSignIn: boolean
  isOpenCloseMenuDash: boolean
  isOpenCloseTrade: boolean
  isOpenCloseAddCrypto: boolean

  setIsOpenCloseSignUp: (value: boolean) => void
  setIsOpenCloseSignIn: (value: boolean) => void
  setIsOpenCloseMenuDash: (value: boolean) => void
  setIsOpenCloseTrade: (value: boolean) => void
  setIsOpenCloseAddCrypto: (value: boolean) => void
}

interface Props {
  children: ReactNode
}

const SystemContext = createContext<PropsSystemContext>({
  isOpenCloseSignUp: false,
  isOpenCloseSignIn: false,
  isOpenCloseMenuDash: false,
  isOpenCloseTrade: false,
  isOpenCloseAddCrypto: false,

  setIsOpenCloseSignUp: () => {},
  setIsOpenCloseSignIn: () => {},
  setIsOpenCloseMenuDash: () => {},
  setIsOpenCloseTrade: () => {},
  setIsOpenCloseAddCrypto: () => {},
})

function SystemProvider({ children }: Props) {
  const [isOpenCloseSignUp, setIsOpenCloseSignUp] = useState<boolean>(false)
  const [isOpenCloseSignIn, setIsOpenCloseSignIn] = useState<boolean>(false)
  const [isOpenCloseMenuDash, setIsOpenCloseMenuDash] = useState<boolean>(false)
  const [isOpenCloseTrade, setIsOpenCloseTrade] = useState<boolean>(false)
  const [isOpenCloseAddCrypto, setIsOpenCloseAddCrypto] =
    useState<boolean>(false)

  return (
    <SystemContext.Provider
      value={{
        isOpenCloseSignUp,
        isOpenCloseSignIn,
        isOpenCloseMenuDash,
        isOpenCloseTrade,
        isOpenCloseAddCrypto,

        setIsOpenCloseMenuDash,
        setIsOpenCloseSignUp,
        setIsOpenCloseSignIn,
        setIsOpenCloseTrade,
        setIsOpenCloseAddCrypto,
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}

const useSystem = () => useContext(SystemContext)

export { SystemProvider, useSystem }

