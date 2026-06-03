import { renderHook, waitFor, createWrapper } from '@/test/test-utils'
import { useLogin } from './useLogin'
import { useAuthStore } from '../store/authStore'
import { mockToken } from '@/test/msw/handlers'

describe('useLogin (orquestração)', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null, status: 'idle' })
  })

  it('faz login e grava a sessão na store', async () => {
    const { result } = renderHook(() => useLogin(), { wrapper: createWrapper() })

    await result.current.mutateAsync({ email: 'david@estacio.br', senha: 'senha123' })

    await waitFor(() => {
      const state = useAuthStore.getState()
      expect(state.token).toBe(mockToken)
      expect(state.user?.email).toBe('david@estacio.br')
      expect(state.status).toBe('authenticated')
    })
  })
})
