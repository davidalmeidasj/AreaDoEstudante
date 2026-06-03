import { useSearchParams } from 'react-router-dom'
import estacioLogo from '@/assets/estacio-logo.png'
import { decodeCredencial, type CredencialPayload } from '../utils/credencial'
import { validacaoPageStyles as s } from './ValidacaoPage.styles'

export function ValidacaoPage() {
  const [params] = useSearchParams()
  const d = params.get('d')
  const credencial = d ? decodeCredencial(d) : null

  return (
    <main className={s.main}>
      <div className={s.card}>
        <img src={estacioLogo} alt="Estácio" className={s.logo} />
        {credencial ? <CredencialValida credencial={credencial} /> : <CredencialInvalida />}
      </div>
    </main>
  )
}

function CredencialValida({ credencial }: { credencial: CredencialPayload }) {
  return (
    <>
      <div className={s.selo}>
        <span className={s.seloIcone} aria-hidden>
          ✓
        </span>
        <span className={s.seloTexto}>Carteirinha válida</span>
      </div>

      <dl className={s.grid}>
        <Dado label="Nome" valor={credencial.nome} full />
        <Dado label="Curso" valor={credencial.curso} full />
        <Dado label="CPF" valor={credencial.cpf} />
        <Dado label="RG" valor={credencial.rg} />
        <Dado label="Data de nascimento" valor={credencial.dataNascimento} />
        <Dado label="Matrícula" valor={credencial.matricula} />
        <Dado label="Validade" valor={credencial.validade} full />
      </dl>
    </>
  )
}

function CredencialInvalida() {
  return (
    <div className={s.invalida}>
      <div className={s.invalidaSelo}>
        <span className={s.seloIcone} aria-hidden>
          ✗
        </span>
        <span className={s.seloTexto}>Carteirinha inválida ou não reconhecida</span>
      </div>
      <p className={s.invalidaTexto}>O código lido não corresponde a uma carteirinha válida.</p>
    </div>
  )
}

function Dado({ label, valor, full = false }: { label: string; valor: string; full?: boolean }) {
  return (
    <div className={full ? s.dadoFull : ''}>
      <dt className={s.dadoLabel}>{label}</dt>
      <dd className={s.dadoValor}>{valor || '—'}</dd>
    </div>
  )
}
