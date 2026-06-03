import { useEstudante } from '../store/carteirinhaStore'
import { validarEstudante, type ResultadoValidacao } from '../schema/estudanteSchema'

export function useCarteirinhaValida(): ResultadoValidacao {
  const estudante = useEstudante()
  return validarEstudante(estudante)
}
