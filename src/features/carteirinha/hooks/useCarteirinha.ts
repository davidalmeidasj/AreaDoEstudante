import { useCarteirinhaStore, useEstudante } from '../store/carteirinhaStore'

export function useCarteirinha() {
  const estudante = useEstudante()
  const atualizar = useCarteirinhaStore((s) => s.atualizar)

  const definirFoto = (file: File): void => {
    const reader = new FileReader()
    reader.onload = () => atualizar({ foto: reader.result as string })
    reader.readAsDataURL(file)
  }

  return { estudante, atualizar, definirFoto }
}
