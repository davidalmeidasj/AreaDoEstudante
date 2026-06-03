import { useRef, type ChangeEvent } from 'react'
import { useCarteirinha } from '../../hooks/useCarteirinha'
import { useCarteirinhaValida } from '../../hooks/useCarteirinhaValida'

export function useCarteirinhaForm() {
  const { estudante, atualizar, definirFoto } = useCarteirinha()
  const { erros } = useCarteirinhaValida()
  const fileRef = useRef<HTMLInputElement>(null)

  const abrirSeletor = () => fileRef.current?.click()

  const handleFoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) definirFoto(file)
  }

  return { estudante, atualizar, erros, fileRef, abrirSeletor, handleFoto }
}
