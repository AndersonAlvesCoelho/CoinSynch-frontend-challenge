import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex gap-1.5 items-center justify-center text-sm font-normal rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-500 text-white hover:bg-primary-500/90',
        destructive: 'bg-secondary-500 text-white hover:bg-secondary-500/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        tertiary: 'bg-tertiary-700 text-white hover:bg-tertiary-700/90',
        ghost:
          'bg-primary-100 text-primary-500 hover:bg-primary-100/90 hover:text-primary-500/90',
        link: 'text-slate-500  hover:text-text-slate-500/90 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-3 md:px-7 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 px-10 md:px-20 py-2',
        icon: 'h-10 w-10',
        link: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
