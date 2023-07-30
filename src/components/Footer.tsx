'use client'
// IMPORTS
import Image from 'next/image'

// SERVICES
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// COMPONENTS
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { toast } from './ui/use-toast'

// GLOBAL
const FormSchema = z.object({
  email: z.string().email({
    message: 'Provide a valid email.',
  }),
})

export default function Footer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <footer className="bg-gradient-to-b from-primary-500 to-primary-700 w-full ">
      <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between gap-4 px-4 md:px-52 py-6 md:py-32 bg-[url('/images/wave-footer.svg')]">
        <div className="flex flex-col gap-2 w-auto md:w-[385px]">
          <h2 className="text-white text-base font-bold">Lorem ipsum</h2>
          <h1 className="text-white text-lg md:text-2xl font-bold">
            Lorem ipsum
          </h1>
          <p className="font-normal text-sm text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center space-y-6 w-auto md:w-[385px]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <Label
                        className="font-normal text-sm text-white"
                        htmlFor="email"
                      >
                        Email
                      </Label>
                      <Input type="email" placeholder="Email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <div className="bg-white w-full">
        <div className="container mx-auto flex flex-col md:flex-row justify-center items-center md:justify-between gap-4 py-6">
          <p className="text-sm font-normal text-text-base">
            Copyright © 2022 - All rights reserved
          </p>
          <Image
            className="mr-5 hover:scale-105 transition duration-700 ease-in-out"
            src="/images/logo.png"
            width={94}
            height={16}
            alt="Logo"
          />
        </div>
      </div>
    </footer>
  )
}
