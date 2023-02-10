import { create } from 'zustand'

type UseModal = {
  modal: JSX.Element | null
  openModal: (modal: JSX.Element) => void
  closeModal: () => void
}

export const useModal = create<UseModal>((set) => ({
  modal: null,
  openModal: (modal) => {
    set({ modal })
  },
  closeModal: () => {
    set({ modal: null })
  },
}))
