import { campoCartaoStyles as s } from './CampoCartao.styles'
import type { CampoCartaoProps } from './CampoCartao.types'

export function CampoCartao({ label, valor }: CampoCartaoProps) {
  return (
    <div className={s.root}>
      <span className={s.label}>{label}</span>
      <span className={s.valor}>{valor || '—'}</span>
    </div>
  )
}
