'use client'

// IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// SERVICES
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
import { toast } from './ui/use-toast'

// ASSETS
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

// GLOBAL
const FormSchema = z.object({
  email: z.string().email({
    message: 'Provide a valid email.',
  }),
  password: z
    .string()
    .min(6, {
      message: 'password must be at least 6 characters.',
    })
    .max(8, {
      message: 'password must not be longer than 8 characters.',
    }),
})

export function DialogSignIn() {
  const { isOpenCloseSignIn, setIsOpenCloseSignIn, setIsOpenCloseSignUp } =
    useSystem()
  const { push } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [passwordView, setPasswordView] = useState<boolean>(false)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    push('/dashboard')
    setIsOpenCloseSignIn(false)
    form.reset()

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
    <Dialog open={isOpenCloseSignIn} onOpenChange={setIsOpenCloseSignIn}>
      <DialogTrigger asChild>
        <Button type="button" variant="link" size="link">
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>
            <span className="flex">
              Sign in to
              <p className="ml-1 text-secondary-500">Coin</p>
              <p className="text-primary-500">Synch</p>
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-center space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <MailIcon className="h-6 w-6 text-secondary-300 absolute mt-2 ml-2" />
                      <Input type="email" placeholder="Email" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex">
                      <LockIcon className="h-6 w-6 text-secondary-300 absolute mt-2 ml-2" />
                      <Input
                        type={!passwordView ? 'password' : 'text'}
                        placeholder="Password"
                        {...field}
                      />
                      <Button
                        className="absolute right-4"
                        type="button"
                        variant="link"
                        onClick={() => setPasswordView(!passwordView)}
                      >
                        {!passwordView ? (
                          <EyeIcon className="h-6 w-6 text-secondary-300 absolute mt-1 -ml-10 md:mt-2 md:ml-2" />
                        ) : (
                          <EyeOffIcon className="h-6 w-6 text-secondary-300 mt-1 -ml-10 md:mt-2 md:ml-2" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="link"
              size="link"
              className="self-end"
            >
              Forgot password?
            </Button>
            <Button type="submit">Submit</Button>

            <Button
              type="submit"
              variant="link"
              size="link"
              onClick={() => {
                setIsOpenCloseSignIn(false)
                setIsOpenCloseSignUp(true)
              }}
            >
              <span className="flex">
                Don’t have an account?{' '}
                <b className="font-bold pl-1.5">Sign up to</b>
                <p className="ml-1 text-secondary-500">Coin</p>
                <p className="text-primary-500">Synch</p>
              </span>
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
