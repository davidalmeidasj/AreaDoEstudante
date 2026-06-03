export interface User {
  id: string
  nome: string
  email: string
}

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated'
