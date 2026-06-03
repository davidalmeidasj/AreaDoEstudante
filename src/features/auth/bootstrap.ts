import { setAuthTokenGetter, setUnauthorizedHandler } from '@shared/api/httpClient'
import { useAuthStore } from './store/authStore'

export function setupAuthInterceptors(): void {
  setAuthTokenGetter(() => useAuthStore.getState().token)
  setUnauthorizedHandler(() => useAuthStore.getState().clearSession())
}
