import { validarEstudante } from './estudanteSchema'
import type { Estudante } from '../types'

const estudanteValido: Estudante = {
  nome: 'João Pedro Souza',
  curso: 'Engenharia',
  cpf: '135.645.037-73',
  rg: '25.698.945-0',
  dataNascimento: '20/12/1991',
  matricula: '2026114854',
  foto: null,
}

describe('validarEstudante', () => {
  it('aprova um estudante com todos os campos preenchidos no formato certo', () => {
    const { sucesso, erros } = validarEstudante(estudanteValido)

    expect(sucesso).toBe(true)
    expect(erros).toEqual({})
  })

  it('reprova quando o nome está vazio', () => {
    const { sucesso, erros } = validarEstudante({ ...estudanteValido, nome: '' })

    expect(sucesso).toBe(false)
    expect(erros.nome).toBeTruthy()
  })

  it('reprova quando o CPF está em formato inválido', () => {
    const { sucesso, erros } = validarEstudante({ ...estudanteValido, cpf: '123' })

    expect(sucesso).toBe(false)
    expect(erros.cpf).toBe('CPF incompleto')
  })
})
