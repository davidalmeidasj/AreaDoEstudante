import { act, renderHook } from '@/test/test-utils'
import { useCarteirinhaValida } from './useCarteirinhaValida'
import { useCarteirinhaStore } from '../store/carteirinhaStore'

describe('useCarteirinhaValida', () => {
  beforeEach(() => {
    useCarteirinhaStore.getState().reset()
  })

  it('é inválido com a store zerada', () => {
    const { result } = renderHook(() => useCarteirinhaValida())
    expect(result.current.sucesso).toBe(false)
  })

  it('fica válido ao preencher todos os campos corretamente', () => {
    const { result } = renderHook(() => useCarteirinhaValida())

    act(() => {
      useCarteirinhaStore.getState().atualizar({
        nome: 'Maria Silva',
        curso: 'Psicologia',
        cpf: '135.645.037-73',
        rg: '25.698.945-0',
        dataNascimento: '20/12/1991',
      })
    })

    expect(result.current.sucesso).toBe(true)
  })
})
