import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import type { LoginRequest } from '../services/authService.types'
import { useAuthStore } from '../store/authStore'

export function useLogin() {
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: ({ user, token }) => {
      setSession({ user, token })
      navigate('/')
    },
  })
}
