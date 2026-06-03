export const validacaoPageStyles = {
  main: 'flex min-h-screen items-center justify-center bg-gradient-to-b from-fundo to-slate-900 p-6',
  card: 'w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl',
  logo: 'mx-auto mb-6 w-[150px]',
  selo: 'mb-6 flex items-center justify-center gap-2 rounded-lg bg-green-50 py-3 text-green-700',
  seloIcone: 'text-xl',
  seloTexto: 'font-semibold',
  grid: 'grid grid-cols-2 gap-x-6 gap-y-4',
  invalida: 'flex flex-col items-center gap-3 py-6 text-center',
  invalidaSelo:
    'flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-red-700',
  invalidaTexto: 'text-sm text-slate-500',
  dadoFull: 'col-span-2',
  dadoLabel: 'text-xs text-label',
  dadoValor: 'text-base text-slate-800',
} as const
