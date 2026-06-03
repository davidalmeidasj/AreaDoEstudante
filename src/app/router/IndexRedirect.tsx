import { Navigate } from 'react-router-dom'
import { useCarteirinhaValida } from '@features/carteirinha'

export function IndexRedirect() {
  const { sucesso } = useCarteirinhaValida()
  return <Navigate to={sucesso ? '/carteirinha' : '/cadastro'} replace />
}
