import { create } from 'zustand'
import { INITIAL_KG_PER_BAG } from '../constants'

type KgPerBag = {
  kgPerBag: number
  setKgPerBag: (kgPerBag: number) => void
}

export const useKgPerBag = create<KgPerBag>((set) => ({
  kgPerBag: INITIAL_KG_PER_BAG,
  setKgPerBag: (kgPerBag) => {
    set({ kgPerBag })
  },
}))
