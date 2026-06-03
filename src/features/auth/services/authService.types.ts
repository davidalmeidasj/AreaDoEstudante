import type { User } from '../types'

export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
  user: User
}
