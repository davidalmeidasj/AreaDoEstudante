import type { InternalAxiosRequestConfig } from 'axios'
import { httpClient, setAuthTokenGetter } from './httpClient'

type RequestInterceptor = {
  fulfilled: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>
}

function getRequestInterceptor(): RequestInterceptor {
  const handlers = (
    httpClient.interceptors.request as unknown as { handlers: RequestInterceptor[] }
  ).handlers
  const first = handlers[0]
  if (!first) throw new Error('Interceptor de request não registrado')
  return first
}

function makeConfig(): InternalAxiosRequestConfig {
  return { headers: {} } as InternalAxiosRequestConfig
}

describe('httpClient', () => {
  afterEach(() => {
    setAuthTokenGetter(() => null)
  })

  it('injeta o header Authorization quando há token', async () => {
    setAuthTokenGetter(() => 'token-123')
    const config = await getRequestInterceptor().fulfilled(makeConfig())
    expect(config.headers.Authorization).toBe('Bearer token-123')
  })

  it('não injeta Authorization quando não há token', async () => {
    setAuthTokenGetter(() => null)
    const config = await getRequestInterceptor().fulfilled(makeConfig())
    expect(config.headers.Authorization).toBeUndefined()
  })
})
