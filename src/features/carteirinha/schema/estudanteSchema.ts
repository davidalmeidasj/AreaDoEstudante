import { z } from 'zod'
import type { Estudante } from '../types'

export const estudanteSchema = z.object({
  nome: z.string().trim().min(3, 'Informe o nome completo'),
  curso: z.string().trim().min(2, 'Informe o curso'),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF incompleto'),
  rg: z.string().regex(/^\d{2}\.\d{3}\.\d{3}-\d$/, 'RG incompleto'),
  dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Data inválida'),
  matricula: z.string().min(1),
  foto: z.string().nullable(),
})

export type ErrosEstudante = Partial<Record<keyof Estudante, string>>

export interface ResultadoValidacao {
  sucesso: boolean
  erros: ErrosEstudante
}

export function validarEstudante(estudante: Estudante): ResultadoValidacao {
  const resultado = estudanteSchema.safeParse(estudante)
  if (resultado.success) {
    return { sucesso: true, erros: {} }
  }

  const erros: ErrosEstudante = {}
  for (const issue of resultado.error.issues) {
    const campo = issue.path[0]
    if (typeof campo === 'string' && !erros[campo as keyof Estudante]) {
      erros[campo as keyof Estudante] = issue.message
    }
  }
  return { sucesso: false, erros }
}
