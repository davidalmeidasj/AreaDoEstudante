import { Button } from '@shared/components/Button'
import { useAuth } from '@features/auth'
import { useNomeEstudante } from '@features/carteirinha'
import { appShellStyles as s } from './AppShell.styles'
import type { AppShellProps } from './AppShell.types'

export function AppShell({ children }: AppShellProps) {
  const { logout } = useAuth()
  const nome = useNomeEstudante()

  return (
    <div className={s.container}>
      <header className={s.header}>
        <span className={s.saudacao}>Olá, {nome || 'estudante'}</span>
        <Button variant="ghost" onClick={logout}>
          Sair
        </Button>
      </header>
      {children}
    </div>
  )
}
