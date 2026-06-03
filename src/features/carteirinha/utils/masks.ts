export const maskCPF = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

export const maskRG = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d)\d+?$/, '$1')

export const maskDate = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1')

export const maskOnlyLetters = (value: string) => value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, '')

export type MaskKind = 'cpf' | 'rg' | 'date' | 'onlyletters' | 'none'

export const applyMask = (mask: MaskKind, value: string): string => {
  switch (mask) {
    case 'cpf':
      return maskCPF(value)
    case 'rg':
      return maskRG(value)
    case 'date':
      return maskDate(value)
    case 'onlyletters':
      return maskOnlyLetters(value)
    default:
      return value
  }
}
