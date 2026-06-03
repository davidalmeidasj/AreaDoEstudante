import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/app/App'

async function enableMocking(): Promise<void> {
  const { worker } = await import('@/test/msw/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking()
  .catch((error) => console.error('[msw] falhou ao iniciar:', error))
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
