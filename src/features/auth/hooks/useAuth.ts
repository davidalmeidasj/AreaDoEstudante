import { useAuthStatus, useAuthStore, useUser } from '../store/authStore'

export function useAuth() {
  const status = useAuthStatus()
  const user = useUser()
  const logout = useAuthStore((s) => s.clearSession)

  return {
    user,
    status,
    isAuthenticated: status === 'authenticated',
    logout,
  }
}
