import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza o conteúdo e dispara onClick', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Entrar</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('fica desabilitado e mostra "Carregando…" quando isLoading', async () => {
    const onClick = vi.fn()
    render(
      <Button isLoading onClick={onClick}>
        Entrar
      </Button>,
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Carregando…')

    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
