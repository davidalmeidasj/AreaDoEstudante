import { buttonStyles as s } from './Button.styles'
import type { ButtonProps } from './Button.types'

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${s.base} ${s.variants[variant]} ${className ?? ''}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? 'Carregando…' : children}
    </button>
  )
}
