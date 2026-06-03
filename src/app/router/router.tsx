import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LoginPage } from '@features/auth'
import { CadastroPage, CarteirinhaViewPage, ValidacaoPage } from '@features/carteirinha'
import { ProtectedRoute } from './ProtectedRoute'
import { IndexRedirect } from './IndexRedirect'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/validar', element: <ValidacaoPage /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <IndexRedirect /> },
      { path: 'cadastro', element: <CadastroPage /> },
      { path: 'carteirinha', element: <CarteirinhaViewPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
