export const carteirinhaCardStyles = {
  root: 'h-[540px] w-[340px] cursor-pointer select-none perspective-card',
  inner: 'relative h-full w-full transform-3d transition-transform duration-700',
  flipped: 'rotate-y-180',
  face:
    'absolute inset-0 backface-hidden rounded-card border-2 border-turquesa ' +
    'bg-white p-6 shadow-2xl flex flex-col',
  verso: 'rotate-y-180 items-center justify-center gap-4',
  logo: 'mx-auto w-[150px]',
  logoVerso: 'w-[150px]',
  foto:
    'mx-auto my-3 flex h-32 w-32 items-center justify-center overflow-hidden ' +
    'rounded-full bg-slate-100 shadow',
  fotoImg: 'h-full w-full object-cover',
  fotoVazia: 'text-sm text-label',
  row: 'flex justify-between gap-4',
  rodape: 'mt-auto pt-3 text-center text-xs text-label',
  qrLegenda: 'text-center text-sm text-valor',
  rg: 'text-xs text-label',
} as const
