import { useNavigate } from 'react-router-dom'
import { Button } from '@shared/components/Button'
import { CarteirinhaForm } from '../components/CarteirinhaForm'
import { useCarteirinhaValida } from '../hooks/useCarteirinhaValida'
import { cadastroPageStyles as s } from './CadastroPage.styles'

export function CadastroPage() {
  const navigate = useNavigate()
  const { sucesso } = useCarteirinhaValida()

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.titulo}>Cadastro do estudante</h1>
        <p className={s.subtitulo}>Preencha todos os campos para liberar a sua carteirinha.</p>
      </header>

      <CarteirinhaForm />

      <div className={s.acoes}>
        <Button disabled={!sucesso} onClick={() => navigate('/carteirinha')}>
          Ir para carteirinha
        </Button>
        {!sucesso && (
          <p className={s.aviso}>Preencha todos os campos corretamente para continuar.</p>
        )}
      </div>
    </div>
  )
}
