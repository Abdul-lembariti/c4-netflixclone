import { atom } from 'recoil'

export function makeImage(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`
}

export const inputedKeyword = atom({
  key: 'keyword',
  default: '',
})

export const focusedUnit = atom<null | string>({
  key: 'focusedUnitProduct',
  default: null,
})
