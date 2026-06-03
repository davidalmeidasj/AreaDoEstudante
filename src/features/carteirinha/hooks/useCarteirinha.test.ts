import { act, renderHook } from '@/test/test-utils'
import { useCarteirinha } from './useCarteirinha'
import { useCarteirinhaStore } from '../store/carteirinhaStore'

describe('useCarteirinha', () => {
  beforeEach(() => {
    useCarteirinhaStore.getState().reset()
  })

  it('expõe o estudante e reflete atualizações', () => {
    const { result } = renderHook(() => useCarteirinha())

    act(() => result.current.atualizar({ curso: 'Engenharia' }))

    expect(result.current.estudante.curso).toBe('Engenharia')
  })
})
