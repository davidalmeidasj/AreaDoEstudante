import { useCarteirinhaStore } from './carteirinhaStore'
import { estudanteInicial } from '../types'

describe('carteirinhaStore', () => {
  beforeEach(() => {
    useCarteirinhaStore.getState().reset()
  })

  it('atualizar aplica um patch parcial sem apagar os demais campos', () => {
    const cpfAntes = useCarteirinhaStore.getState().estudante.cpf

    useCarteirinhaStore.getState().atualizar({ nome: 'Maria Souza' })

    const estudante = useCarteirinhaStore.getState().estudante
    expect(estudante.nome).toBe('Maria Souza')
    expect(estudante.cpf).toBe(cpfAntes)
  })

  it('reset volta ao estudante inicial', () => {
    useCarteirinhaStore.getState().atualizar({ nome: 'Outro' })
    useCarteirinhaStore.getState().reset()

    expect(useCarteirinhaStore.getState().estudante.nome).toBe(estudanteInicial.nome)
  })
})
