import { encodeCredencial, decodeCredencial } from './credencial'
import type { Estudante } from '../types'

const estudante: Estudante = {
  nome: 'João Conceição',
  curso: 'Engenharia',
  cpf: '135.645.037-73',
  rg: '25.698.945-0',
  dataNascimento: '20/12/1991',
  matricula: '2026114854',
  foto: null,
}

describe('credencial', () => {
  it('faz roundtrip encode→decode preservando os dados (com acento)', () => {
    const credencial = decodeCredencial(encodeCredencial(estudante))

    expect(credencial).not.toBeNull()
    expect(credencial?.nome).toBe('João Conceição')
    expect(credencial?.cpf).toBe('135.645.037-73')
    expect(credencial?.matricula).toBe('2026114854')
    expect(credencial?.validade).toMatch(/^Abril de \d{4}$/)
  })

  it('não inclui a foto no payload', () => {
    const credencial = decodeCredencial(encodeCredencial(estudante))
    expect(credencial).not.toHaveProperty('foto')
  })

  it('devolve null para um parâmetro corrompido', () => {
    expect(decodeCredencial('isto-nao-eh-base64-valido###')).toBeNull()
  })

  it('devolve null quando o payload não bate com o schema', () => {
    const incompleto = btoa(JSON.stringify({ nome: 'X' }))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
    expect(decodeCredencial(incompleto)).toBeNull()
  })
})
