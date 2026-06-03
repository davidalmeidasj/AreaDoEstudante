import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { estudanteInicial, type Estudante } from '../types'

interface CarteirinhaState {
  estudante: Estudante
}

interface CarteirinhaActions {
  atualizar: (patch: Partial<Estudante>) => void
  reset: () => void
}

export const useCarteirinhaStore = create<CarteirinhaState & CarteirinhaActions>()(
  devtools(
    persist(
      immer((set) => ({
        estudante: estudanteInicial,
        atualizar: (patch) =>
          set((state) => {
            Object.assign(state.estudante, patch)
          }),
        reset: () =>
          set((state) => {
            state.estudante = estudanteInicial
          }),
      })),
      { name: 'carteirinha:estudante' },
    ),
    { name: 'carteirinha-store' },
  ),
)

export const useEstudante = () => useCarteirinhaStore((s) => s.estudante)

export const useNomeEstudante = () => useCarteirinhaStore((s) => s.estudante.nome)
