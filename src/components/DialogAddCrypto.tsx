'use client'

// IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// SERVICES
import { useExchangeRate } from '@/context/ExchangeRateContext'
import { useSystem } from '@/context/SystemContext'

// COMPONENTS
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

// ASSETS
import { PlusIcon } from 'lucide-react'

// GLOBAL
const FormSchema = z.object({
  crypto: z.string({
    required_error: 'Please select an crypto to display.',
  }),
  value: z.string().min(0, {
    message: 'value must be at least 0 characters.',
  }),
})

export function DialogAddCrypto() {
  // useSystem
  const { exchangeRate, handleAddCrypto } = useExchangeRate()
  const { isOpenCloseAddCrypto, setIsOpenCloseAddCrypto } = useSystem()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleAddCrypto(data.crypto, parseFloat(data.value))
    setIsOpenCloseAddCrypto(false)
    form.reset()
  }
  return (
    <Dialog open={isOpenCloseAddCrypto} onOpenChange={setIsOpenCloseAddCrypto}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="flex  p-1.5 text-center justify-center h-10  md:w-auto w-10"
        >
          <PlusIcon className="h-4 w-4 text-white" />
          <p className="hidden md:flex">Add crypto</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>Add Crypto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center space-y-6"
          >
            <FormField
              control={form.control}
              name="crypto"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-56 overflow-y-auto">
                      {exchangeRate.length !== 0 &&
                        exchangeRate.map((item, index) => (
                          <>
                            <SelectItem key={index} value={item.name}>
                              <div className="flex  items-center  gap-1">
                                <Image
                                  alt={`Logo da(o) crypto ${item.name}`}
                                  src={item.image}
                                  width={32}
                                  height={32}
                                />
                                <p className="text-text-base pl-4">
                                  {item.name}
                                </p>
                                <p className="text-slate-500">{item.symbol}</p>
                              </div>
                            </SelectItem>
                          </>
                        ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="pl-2"
                      type="number"
                      placeholder="0,00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Add Crypto</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
