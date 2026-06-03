import { applyMask, maskCPF, maskDate, maskRG } from './masks'

describe('masks', () => {
  it('formata CPF', () => {
    expect(maskCPF('13564503773')).toBe('135.645.037-73')
  })

  it('limita o CPF a 11 dígitos', () => {
    expect(maskCPF('135645037739999')).toBe('135.645.037-73')
  })

  it('formata RG', () => {
    expect(maskRG('256989450')).toBe('25.698.945-0')
  })

  it('formata data', () => {
    expect(maskDate('20121991')).toBe('20/12/1991')
  })

  it('applyMask("none") devolve o valor cru', () => {
    expect(applyMask('none', 'abc 123')).toBe('abc 123')
  })

  it('applyMask roteia para a máscara certa', () => {
    expect(applyMask('cpf', '13564503773')).toBe('135.645.037-73')
  })
})
