import { render, screen, userEvent } from '@/test/test-utils'
import { CarteirinhaForm } from './CarteirinhaForm'
import { useCarteirinhaStore } from '../../store/carteirinhaStore'

describe('CarteirinhaForm', () => {
  beforeEach(() => {
    useCarteirinhaStore.getState().reset()
  })

  it('edita o curso e reflete na store', async () => {
    render(<CarteirinhaForm />)
    const curso = screen.getByLabelText(/curso/i)

    await userEvent.clear(curso)
    await userEvent.type(curso, 'Engenharia')

    expect(useCarteirinhaStore.getState().estudante.curso).toBe('Engenharia')
  })

  it('aplica a máscara de CPF enquanto digita', async () => {
    render(<CarteirinhaForm />)
    const cpf = screen.getByLabelText('CPF')

    await userEvent.clear(cpf)
    await userEvent.type(cpf, '13564503773')

    expect(cpf).toHaveValue('135.645.037-73')
  })
})
