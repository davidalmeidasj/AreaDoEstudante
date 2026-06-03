import { renderWithProviders, screen, userEvent, waitFor } from '@/test/test-utils'
import { LoginForm } from './LoginForm'
import { useAuthStore } from '../../store/authStore'

describe('LoginForm (componente)', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, status: 'idle' })
  })

  it('exibe erro quando faltam credenciais (envio vazio)', async () => {
    renderWithProviders(<LoginForm />)

    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/inválid/i)
  })

  it('autentica e grava a sessão com credenciais válidas', async () => {
    renderWithProviders(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'david@estacio.br')
    await userEvent.type(screen.getByLabelText(/senha/i), 'senha123')
    await userEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => expect(useAuthStore.getState().status).toBe('authenticated'))
  })
})
