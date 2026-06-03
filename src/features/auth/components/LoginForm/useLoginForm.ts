import { useState, type FormEvent } from 'react'
import { useLogin } from '../../hooks/useLogin'

export function useLoginForm() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const login = useLogin()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    login.mutate({ email, senha })
  }

  return {
    email,
    setEmail,
    senha,
    setSenha,
    handleSubmit,
    isError: login.isError,
    isPending: login.isPending,
  }
}
