import { LoginForm } from '../components/LoginForm'
import { loginPageStyles as s } from './LoginPage.styles'

export function LoginPage() {
  return (
    <main className={s.main}>
      <div className={s.card}>
        <h1 className={s.titulo}>Carteirinha Digital</h1>
        <p className={s.subtitulo}>Entre para acessar sua carteirinha.</p>
        <LoginForm />
        <p className={s.demo}>Demo: qualquer e-mail e senha entram</p>
      </div>
    </main>
  )
}
