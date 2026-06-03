import { Button } from '@shared/components/Button'
import { useLoginForm } from './useLoginForm'
import { loginFormStyles as s } from './LoginForm.styles'

export function LoginForm() {
  const { email, setEmail, senha, setSenha, handleSubmit, isError, isPending } = useLoginForm()

  return (
    <form onSubmit={handleSubmit} className={s.form} noValidate>
      <label className={s.label}>
        <span className={s.labelText}>E-mail</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={s.input}
          placeholder="voce@estacio.br"
        />
      </label>

      <label className={s.label}>
        <span className={s.labelText}>Senha</span>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className={s.input}
          placeholder="••••••••"
        />
      </label>

      {isError && (
        <p role="alert" className={s.error}>
          Credenciais inválidas. Tente novamente.
        </p>
      )}

      <Button type="submit" isLoading={isPending}>
        Entrar
      </Button>
    </form>
  )
}
