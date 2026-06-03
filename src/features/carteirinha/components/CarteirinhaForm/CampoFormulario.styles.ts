export const campoFormularioStyles = {
  root: 'flex flex-1 flex-col gap-1.5',
  label: 'text-sm text-label',
  input:
    'w-full rounded-lg border bg-white/95 px-3 py-2.5 text-slate-800 outline-none ' +
    'focus:border-turquesa',
  inputErro: 'border-red-400',
  inputOk: 'border-transparent',
  erro: 'text-xs text-red-300',
} as const
