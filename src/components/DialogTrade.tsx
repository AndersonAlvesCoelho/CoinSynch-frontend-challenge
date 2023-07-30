'use client'

// IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// SERVICES
import { useExchangeRate } from '@/context/ExchangeRateContext'
import { useSystem } from '@/context/SystemContext'

// COMPONENTS
import Image from 'next/image'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

// ASSETS

export function DialogTrade() {
  const { userCrypto, handleTrade, trade } = useExchangeRate()
  const { isOpenCloseTrade, setIsOpenCloseTrade } = useSystem()

  const crypto =
    userCrypto.length !== 0
      ? userCrypto.filter((item) => item.name === trade)
      : []

  const FormSchema = z.object({
    transfer: z.string({
      required_error: 'Please select an transfer to display.',
    }),
    value: z.string().min(0, {
      message: 'value must be at least 0 characters.',
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleTrade(data.transfer, crypto[0]?.name, parseFloat(data.value))
    setIsOpenCloseTrade(false)
    form.reset()
  }

  return (
    <Dialog open={isOpenCloseTrade} onOpenChange={setIsOpenCloseTrade}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>Tansfer Crypto</DialogTitle>
          <div className="flex gap-6 justify-center items-center">
            <hr />
            <p className="text-xs text-secondary-400">You are transfering</p>
            <div className="flex justify-center items-center gap-2 text-text-base text-xs p-4 px-10">
              <Image
                alt={`Logo da(o) crypto ${crypto[0]?.name}`}
                src={crypto[0]?.image}
                width={32}
                height={32}
              />
              <p className="text-text-base">{crypto[0]?.name}</p>
              <p className="text-slate-500">{crypto[0]?.symbol}</p>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center space-y-6"
          >
            <FormField
              control={form.control}
              name="transfer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transfer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transfer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="in">Transfer in</SelectItem>
                      <SelectItem value="out">Transfer out</SelectItem>
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
                  <FormLabel>Quantity</FormLabel>
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

            <Button type="submit">Transfer Crypto</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
