import { authService } from './authService'
import { mockToken } from '@/test/msw/handlers'

describe('authService (camada de serviço)', () => {
  it('login autentica e devolve token + usuário com o e-mail informado', async () => {
    const res = await authService.login({ email: 'maria.silva@estacio.br', senha: 'qualquer' })

    expect(res.token).toBe(mockToken)
    expect(res.user.email).toBe('maria.silva@estacio.br')
    expect(res.user.nome).toBe('Maria Silva')
  })

  it('login rejeita (401) quando faltam credenciais', async () => {
    await expect(authService.login({ email: '', senha: '' })).rejects.toMatchObject({
      response: { status: 401 },
    })
  })
})
