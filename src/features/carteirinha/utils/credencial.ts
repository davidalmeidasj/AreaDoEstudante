import { z } from 'zod'
import { validadeTexto, type Estudante } from '../types'

export const credencialSchema = z.object({
  nome: z.string(),
  curso: z.string(),
  cpf: z.string(),
  rg: z.string(),
  dataNascimento: z.string(),
  matricula: z.string(),
  validade: z.string(),
})

export type CredencialPayload = z.infer<typeof credencialSchema>

function toBase64Url(texto: string): string {
  const bytes = new TextEncoder().encode(texto)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(b64url: string): string {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64)
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function montarPayload(estudante: Estudante): CredencialPayload {
  return {
    nome: estudante.nome,
    curso: estudante.curso,
    cpf: estudante.cpf,
    rg: estudante.rg,
    dataNascimento: estudante.dataNascimento,
    matricula: estudante.matricula,
    validade: validadeTexto(),
  }
}

export function encodeCredencial(estudante: Estudante): string {
  return toBase64Url(JSON.stringify(montarPayload(estudante)))
}

export function decodeCredencial(param: string): CredencialPayload | null {
  try {
    const json = fromBase64Url(param)
    const resultado = credencialSchema.safeParse(JSON.parse(json))
    return resultado.success ? resultado.data : null
  } catch {
    return null
  }
}

export function buildValidacaoUrl(estudante: Estudante, origin: string): string {
  return `${origin}/validar?d=${encodeCredencial(estudante)}`
}
