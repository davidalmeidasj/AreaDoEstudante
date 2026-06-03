import { http, HttpResponse } from 'msw'
import type { User } from '@features/auth'

export const mockUser: User = {
  id: 'u_1',
  nome: 'David Almeida',
  email: 'david@estacio.br',
}

export const mockToken = 'fake-jwt-token'

function userFromEmail(email: string): User {
  const base = email.split('@')[0] ?? 'estudante'
  const nome =
    base
      .split(/[._-]/)
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ') || 'Estudante'
  return { id: `u_${base}`, nome, email }
}

export const handlers = [
  http.post('*/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email?: string; senha?: string }

    if (body.email && body.senha) {
      return HttpResponse.json({ token: mockToken, user: userFromEmail(body.email) })
    }

    return HttpResponse.json({ message: 'Informe e-mail e senha' }, { status: 401 })
  }),

  http.get('*/api/auth/me', ({ request }) => {
    const auth = request.headers.get('authorization')
    if (auth === `Bearer ${mockToken}`) {
      return HttpResponse.json(mockUser)
    }
    return HttpResponse.json({ message: 'Não autorizado' }, { status: 401 })
  }),
]
