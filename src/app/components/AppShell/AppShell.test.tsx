import { renderWithProviders, screen, act } from '@/test/test-utils'
import { AppShell } from './AppShell'
import { useCarteirinhaStore } from '@features/carteirinha/store/carteirinhaStore'

describe('AppShell (saudação ligada ao Zustand da carteirinha)', () => {
  beforeEach(() => {
    useCarteirinhaStore.getState().reset()
  })

  it('mostra "Olá, estudante" quando o nome está vazio', () => {
    renderWithProviders(
      <AppShell>
        <p>conteúdo</p>
      </AppShell>,
    )

    expect(screen.getByText(/Olá, estudante/)).toBeInTheDocument()
  })

  it('reflete o nome digitado na carteirinha ao vivo', () => {
    renderWithProviders(
      <AppShell>
        <p>conteúdo</p>
      </AppShell>,
    )

    act(() => {
      useCarteirinhaStore.getState().atualizar({ nome: 'Maria' })
    })

    expect(screen.getByText(/Olá, Maria/)).toBeInTheDocument()
  })
})
