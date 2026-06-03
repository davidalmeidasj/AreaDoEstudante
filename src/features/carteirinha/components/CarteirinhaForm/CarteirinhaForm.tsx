import { Button } from '@shared/components/Button'
import { useCarteirinhaForm } from './useCarteirinhaForm'
import { CampoFormulario } from './CampoFormulario'
import { carteirinhaFormStyles as s } from './CarteirinhaForm.styles'

export function CarteirinhaForm() {
  const { estudante, atualizar, erros, fileRef, abrirSeletor, handleFoto } = useCarteirinhaForm()

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.form}>
      <h2 className={s.titulo}>Dados do estudante</h2>

      <Button type="button" onClick={abrirSeletor}>
        {estudante.foto ? 'Trocar foto' : 'Escolher foto de perfil'}
      </Button>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFoto} />

      <CampoFormulario
        label="Nome completo"
        value={estudante.nome}
        mask="onlyletters"
        erro={erros.nome}
        onChange={(v) => atualizar({ nome: v })}
      />
      <CampoFormulario
        label="Curso"
        value={estudante.curso}
        erro={erros.curso}
        onChange={(v) => atualizar({ curso: v })}
      />
      <div className={s.row}>
        <CampoFormulario
          label="CPF"
          value={estudante.cpf}
          mask="cpf"
          erro={erros.cpf}
          onChange={(v) => atualizar({ cpf: v })}
        />
        <CampoFormulario
          label="RG"
          value={estudante.rg}
          mask="rg"
          erro={erros.rg}
          onChange={(v) => atualizar({ rg: v })}
        />
      </div>
      <div className={s.row}>
        <CampoFormulario
          label="Data de nascimento"
          value={estudante.dataNascimento}
          mask="date"
          erro={erros.dataNascimento}
          onChange={(v) => atualizar({ dataNascimento: v })}
        />
        <CampoFormulario
          label="Matrícula"
          value={estudante.matricula}
          onChange={(v) => atualizar({ matricula: v })}
        />
      </div>
    </form>
  )
}
