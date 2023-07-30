'use client'

// IMPORTS
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { toast } from './ui/use-toast'

// ASSETS
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { Checkbox } from './ui/checkbox'

// GLOBAL
const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: 'name must be at least 2 characters.',
      })
      .max(30, {
        message: 'name must not be longer than 30 characters.',
      }),
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
    confirmPassword: z.string(),
    privacyPolicy: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })

export function DialogSignUp() {
  const { isOpenCloseSignUp, setIsOpenCloseSignUp, setIsOpenCloseSignIn } =
    useSystem()
  const { push } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [passwordView, setPasswordView] = useState<boolean>(false)
  const [confirmPasswordView, setConfirmPasswordView] = useState<boolean>(false)

  function onSubmit(data: z.infer<typeof FormSchema>) {
    push('/dashboard')
    setIsOpenCloseSignUp(false)
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
    <Dialog open={isOpenCloseSignUp} onOpenChange={setIsOpenCloseSignUp}>
      <DialogTrigger asChild>
        <Button type="button">Sign up</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="items-center">
          <DialogTitle>
            <span className="flex">
              Sign up to
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div>
                      <UserIcon className="h-6 w-6 text-secondary-300 absolute mt-2 ml-2" />
                      <Input type="text" placeholder="Name" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex">
                      <MailIcon className="h-6 w-6 text-secondary-300 absolute mt-2 ml-2" />
                      <Input type="text" placeholder="Email" {...field} />
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
                          <EyeIcon className="h-6 w-6 text-secondary-300 absolute mt-1 -ml-10 md:mt-2 md:ml-" />
                        ) : (
                          <EyeOffIcon className="h-6 w-6 text-secondary-300 mt-1 -ml-10 md:mt-2 md:ml-" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex">
                      <LockIcon className="h-6 w-6 text-secondary-300 absolute mt-2 ml-2" />
                      <Input
                        type={!confirmPasswordView ? 'password' : 'text'}
                        placeholder="Confirm password"
                        {...field}
                      />
                      <Button
                        className="absolute right-4"
                        type="button"
                        variant="link"
                        onClick={() =>
                          setConfirmPasswordView(!confirmPasswordView)
                        }
                      >
                        {!confirmPasswordView ? (
                          <EyeIcon className="h-6 w-6 text-secondary-300 absolute mt-1 -ml-10 md:mt-2 md:ml-" />
                        ) : (
                          <EyeOffIcon className="h-6 w-6 text-secondary-300 mt-1 -ml-10 md:mt-2 md:ml-" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-text-base">
                      I have read and accept the{' '}
                      <b className="font-bold">Privacy Policy</b> and{' '}
                      <b className="font-bold">Terms of User Sign up</b>.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign up</Button>

            <Button
              type="submit"
              variant="link"
              size="link"
              onClick={() => {
                setIsOpenCloseSignIn(true)
                setIsOpenCloseSignUp(false)
              }}
            >
              <span className="flex">
                Already have and account?{' '}
                <b className="font-bold pl-1.5"> Sign in to</b>
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
