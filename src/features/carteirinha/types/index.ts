export interface Estudante {
  nome: string
  curso: string
  cpf: string
  rg: string
  dataNascimento: string
  matricula: string
  foto: string | null
}

export function gerarMatricula(): string {
  const ano = new Date().getFullYear()
  const seq = Math.floor(Math.random() * (100 * 2022)) + 1
  return `${ano}${seq}`
}

export function validadeTexto(): string {
  return `Abril de ${new Date().getFullYear() + 1}`
}

export const estudanteInicial: Estudante = {
  nome: '',
  curso: '',
  cpf: '',
  rg: '',
  dataNascimento: '',
  matricula: gerarMatricula(),
  foto: null,
}
