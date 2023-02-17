import { create } from 'zustand'

export type FeeSelection = {
  id: string
  date: string
  amount: number
}

type FeeStore = {
  selectionMode: boolean
  setSelectionMode: (selectionMode: boolean) => void
  selectedFees: FeeSelection[]
  setSelectedFees: (selectedFees: FeeSelection[]) => void
  addSelectedFee: (fee: FeeSelection) => void
  removeSelectedFee: (fee: FeeSelection) => void
  updateSelectedFee: (fee: FeeSelection) => void
}

export const useFeeStore = create<FeeStore>((set) => ({
  selectionMode: false,
  setSelectionMode: (selectionMode) => {
    set({ selectionMode })
  },
  selectedFees: [],
  setSelectedFees: (selectedFees) => {
    set({ selectedFees })
  },
  addSelectedFee: (fee) => {
    set((state) => ({ selectedFees: [...state.selectedFees, fee] }))
  },
  removeSelectedFee: (fee) => {
    set((state) => ({ selectedFees: state.selectedFees.filter((f) => f.id !== fee.id) }))
  },
  updateSelectedFee: (fee) => {
    set((state) => ({
      selectedFees: state.selectedFees.map((f) => (f.id === fee.id ? fee : f)),
    }))
  },
}))
