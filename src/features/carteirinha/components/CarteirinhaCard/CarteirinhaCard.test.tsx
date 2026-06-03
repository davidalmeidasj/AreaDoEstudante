import { render, screen } from '@/test/test-utils'
import userEvent from '@testing-library/user-event'
import { CarteirinhaCard } from './CarteirinhaCard'
import { estudanteInicial, type Estudante } from '../../types'

const estudanteMock: Estudante = {
  ...estudanteInicial,
  nome: 'Maria Silva',
  cpf: '135.645.037-73',
}

describe('CarteirinhaCard', () => {
  it('renderiza os dados do estudante', () => {
    render(<CarteirinhaCard estudante={estudanteMock} />)

    expect(screen.getByText('Maria Silva')).toBeInTheDocument()
    expect(screen.getByText('135.645.037-73')).toBeInTheDocument()
  })

  it('vira o cartão ao clicar (aria-pressed alterna)', async () => {
    render(<CarteirinhaCard estudante={estudanteMock} />)
    const card = screen.getByRole('button', { name: /carteirinha/i })

    expect(card).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(card)
    expect(card).toHaveAttribute('aria-pressed', 'true')
  })
})
