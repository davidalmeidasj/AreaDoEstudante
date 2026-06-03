import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@shared/components/Button'
import { CarteirinhaCard } from '../components/CarteirinhaCard'
import { useCarteirinha } from '../hooks/useCarteirinha'
import { useCarteirinhaValida } from '../hooks/useCarteirinhaValida'
import { carteirinhaViewPageStyles as s } from './CarteirinhaViewPage.styles'

export function CarteirinhaViewPage() {
  const navigate = useNavigate()
  const { estudante } = useCarteirinha()
  const { sucesso } = useCarteirinhaValida()

  if (!sucesso) {
    return <Navigate to="/cadastro" replace />
  }

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.titulo}>Carteirinha Digital de Estudante</h1>
        <p className={s.subtitulo}>Clique no cartão para virar.</p>
      </header>

      <CarteirinhaCard estudante={estudante} />

      <Button variant="ghost" onClick={() => navigate('/cadastro')}>
        Editar dados
      </Button>
    </div>
  )
}
