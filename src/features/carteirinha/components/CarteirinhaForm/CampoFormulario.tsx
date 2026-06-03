import { applyMask } from '../../utils/masks'
import { campoFormularioStyles as s } from './CampoFormulario.styles'
import type { CampoFormularioProps } from './CampoFormulario.types'

export function CampoFormulario({
  label,
  value,
  mask = 'none',
  erro,
  onChange,
}: CampoFormularioProps) {
  const mostrarErro = Boolean(erro) && value.length > 0

  return (
    <label className={s.root}>
      <span className={s.label}>{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(applyMask(mask, e.target.value))}
        aria-invalid={mostrarErro}
        className={`${s.input} ${mostrarErro ? s.inputErro : s.inputOk}`}
      />
      {mostrarErro && <span className={s.erro}>{erro}</span>}
    </label>
  )
}
