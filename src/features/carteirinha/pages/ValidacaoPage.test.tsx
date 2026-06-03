import { renderWithProviders, screen } from '@/test/test-utils'
import { ValidacaoPage } from './ValidacaoPage'
import { encodeCredencial } from '../utils/credencial'
import type { Estudante } from '../types'

const estudante: Estudante = {
  nome: 'Maria Silva',
  curso: 'Psicologia',
  cpf: '135.645.037-73',
  rg: '25.698.945-0',
  dataNascimento: '20/12/1991',
  matricula: '2026114854',
  foto: null,
}

describe('ValidacaoPage', () => {
  it('mostra "válida" e os dados com um QR válido', () => {
    const d = encodeCredencial(estudante)
    renderWithProviders(<ValidacaoPage />, { route: `/validar?d=${d}` })

    expect(screen.getByText(/carteirinha válida/i)).toBeInTheDocument()
    expect(screen.getByText('Maria Silva')).toBeInTheDocument()
    expect(screen.getByText('135.645.037-73')).toBeInTheDocument()
  })

  it('mostra "inválida" quando não há parâmetro', () => {
    renderWithProviders(<ValidacaoPage />, { route: '/validar' })

    expect(screen.getByText(/inválida ou não reconhecida/i)).toBeInTheDocument()
  })
})
