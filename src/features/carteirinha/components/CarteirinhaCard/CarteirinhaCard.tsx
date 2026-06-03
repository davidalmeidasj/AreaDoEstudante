import estacioLogo from '@/assets/estacio-logo.png'
import { validadeTexto } from '../../types'
import { buildValidacaoUrl } from '../../utils/credencial'
import { CarteirinhaQRCode } from '../CarteirinhaQRCode'
import { CampoCartao } from './CampoCartao'
import { useCardFlip } from './useCardFlip'
import { carteirinhaCardStyles as s } from './CarteirinhaCard.styles'
import type { CarteirinhaCardProps } from './CarteirinhaCard.types'

export function CarteirinhaCard({ estudante }: CarteirinhaCardProps) {
  const { virado, flip, onKeyDown } = useCardFlip()

  return (
    <div
      className={s.root}
      role="button"
      tabIndex={0}
      aria-pressed={virado}
      aria-label="Carteirinha de estudante — clique para virar"
      onClick={flip}
      onKeyDown={onKeyDown}
    >
      <div className={`${s.inner} ${virado ? s.flipped : ''}`}>
        <div className={s.face}>
          <img src={estacioLogo} alt="Estácio" className={s.logo} />

          <div className={s.foto}>
            {estudante.foto ? (
              <img src={estudante.foto} alt="Foto do estudante" className={s.fotoImg} />
            ) : (
              <span className={s.fotoVazia}>Sem foto</span>
            )}
          </div>

          <CampoCartao label="Nome" valor={estudante.nome} />
          <div className={s.row}>
            <CampoCartao label="CPF" valor={estudante.cpf} />
            <CampoCartao label="Data de nascimento" valor={estudante.dataNascimento} />
          </div>
          <CampoCartao label="Curso" valor={estudante.curso} />
          <div className={s.row}>
            <CampoCartao label="Matrícula" valor={estudante.matricula} />
            <CampoCartao label="Validade" valor={validadeTexto()} />
          </div>

          <p className={s.rodape}>
            Válida mediante apresentação de documento de identidade com foto
          </p>
        </div>

        <div className={`${s.face} ${s.verso}`}>
          <img src={estacioLogo} alt="Estácio" className={s.logoVerso} />
          <CarteirinhaQRCode value={buildValidacaoUrl(estudante, window.location.origin)} />
          <p className={s.qrLegenda}>
            Aponte a câmera para validar
            <br />
            <strong>{estudante.matricula}</strong>
          </p>
          <p className={s.rg}>{estudante.rg}</p>
        </div>
      </div>
    </div>
  )
}
