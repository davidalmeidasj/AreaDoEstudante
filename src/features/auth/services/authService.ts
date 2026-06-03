import { httpClient } from '@shared/api/httpClient'
import type { User } from '../types'
import type { LoginRequest, LoginResponse } from './authService.types'

export const authService = {
  login: async (body: LoginRequest): Promise<LoginResponse> => {
    const { data } = await httpClient.post<LoginResponse>('/auth/login', body)
    return data
  },

  getMe: async (): Promise<User> => {
    const { data } = await httpClient.get<User>('/auth/me')
    return data
  },
}
