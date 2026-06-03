import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { createQueryClient } from '@shared/lib/queryClient'

interface Options extends Omit<RenderOptions, 'wrapper'> {
  route?: string
}

function buildWrapper(route: string) {
  const queryClient = createQueryClient()
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </QueryClientProvider>
    )
  }
  return { Wrapper, queryClient }
}

export function renderWithProviders(ui: ReactElement, { route = '/', ...options }: Options = {}) {
  const { Wrapper, queryClient } = buildWrapper(route)
  return { queryClient, ...render(ui, { wrapper: Wrapper, ...options }) }
}

export function createWrapper(route = '/') {
  return buildWrapper(route).Wrapper
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
