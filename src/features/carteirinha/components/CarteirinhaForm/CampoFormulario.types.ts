import type { MaskKind } from '../../utils/masks'

export interface CampoFormularioProps {
  label: string
  value: string
  mask?: MaskKind
  erro?: string
  onChange: (value: string) => void
}
