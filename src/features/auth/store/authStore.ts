import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { AuthStatus, User } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  status: AuthStatus
}

interface AuthActions {
  setSession: (payload: { user: User; token: string }) => void
  clearSession: () => void
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        setSession: ({ user, token }) =>
          set((state) => {
            state.user = user
            state.token = token
            state.status = 'authenticated'
          }),
        clearSession: () =>
          set((state) => {
            state.user = null
            state.token = null
            state.status = 'unauthenticated'
          }),
      })),
      {
        name: 'carteirinha:auth',
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          status: state.status,
        }),
      },
    ),
    { name: 'auth-store' },
  ),
)

export const useToken = () => useAuthStore((s) => s.token)
export const useUser = () => useAuthStore((s) => s.user)
export const useAuthStatus = () => useAuthStore((s) => s.status)
