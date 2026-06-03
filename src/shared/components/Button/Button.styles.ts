import type { ButtonVariant } from './Button.types'

export const buttonStyles = {
  base:
    'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold ' +
    'transition disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none ' +
    'focus-visible:ring-2 focus-visible:ring-turquesa',
  variants: {
    primary: 'bg-turquesa text-white hover:brightness-110',
    ghost: 'bg-transparent text-turquesa hover:bg-turquesa/10',
  } satisfies Record<ButtonVariant, string>,
} as const
