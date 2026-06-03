import { useAuthStore } from './authStore'
import { mockUser } from '@/test/msw/handlers'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, status: 'idle' })
  })

  it('setSession popula user, token e marca como autenticado', () => {
    useAuthStore.getState().setSession({ user: mockUser, token: 'abc' })

    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.token).toBe('abc')
    expect(state.status).toBe('authenticated')
  })

  it('clearSession limpa a sessão e marca como não autenticado', () => {
    useAuthStore.getState().setSession({ user: mockUser, token: 'abc' })
    useAuthStore.getState().clearSession()

    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.status).toBe('unauthenticated')
  })

  it('persiste a sessão no localStorage (auto-login)', () => {
    useAuthStore.getState().setSession({ user: mockUser, token: 'abc' })

    const raw = localStorage.getItem('carteirinha:auth')
    expect(raw).toBeTruthy()
    expect(raw).toContain('abc')
  })
})
