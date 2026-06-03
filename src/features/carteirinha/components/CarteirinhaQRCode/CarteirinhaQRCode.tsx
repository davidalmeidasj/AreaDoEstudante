import { useCarteirinhaQRCode } from './useCarteirinhaQRCode'
import { carteirinhaQRCodeStyles as s } from './CarteirinhaQRCode.styles'
import type { CarteirinhaQRCodeProps } from './CarteirinhaQRCode.types'

export function CarteirinhaQRCode({ value, size }: CarteirinhaQRCodeProps) {
  const ref = useCarteirinhaQRCode(value, size)

  return <div ref={ref} className={s.wrapper} aria-label="QR Code de validação" />
}
