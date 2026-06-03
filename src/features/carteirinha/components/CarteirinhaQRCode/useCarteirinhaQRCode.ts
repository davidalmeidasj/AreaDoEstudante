import { useEffect, useRef } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { theme } from '@shared/theme'
import estacioIcon from '@/assets/estacio-icon.webp'

const DEFAULT_SIZE = 200

export function useCarteirinhaQRCode(value: string, size: number = DEFAULT_SIZE) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: size,
      height: size,
      type: 'svg',
      data: value,
      image: estacioIcon,
      margin: 0,
      qrOptions: { errorCorrectionLevel: 'H' },
      dotsOptions: { color: theme.colors.fundo, type: 'dots' },
      cornersSquareOptions: { color: theme.colors.fundo, type: 'extra-rounded' },
      cornersDotOptions: { color: theme.colors.fundo, type: 'dot' },
      backgroundOptions: { color: theme.colors.branco },
      imageOptions: { crossOrigin: 'anonymous', margin: 4, imageSize: 0.35 },
    })

    const el = ref.current
    if (el) {
      el.innerHTML = ''
      qr.append(el)
    }
    return () => {
      if (el) el.innerHTML = ''
    }
  }, [value, size])

  return ref
}
