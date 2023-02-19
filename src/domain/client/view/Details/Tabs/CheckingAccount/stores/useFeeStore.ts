import { create } from 'zustand'

export type TransactionSelected = {
  id: string
  date: string
  amount: number
}

type FeeStore = {
  selectionMode: boolean
  setSelectionMode: (selectionMode: boolean) => void
  selectedTransactions: TransactionSelected[]
  setSelectedTransactions: (selectedFees: TransactionSelected[]) => void
  addSelectedTransaction: (fee: TransactionSelected) => void
  removeSelectedTransaction: (fee: TransactionSelected) => void
  updateSelectedTransaction: (fee: TransactionSelected) => void
  resetStore: () => void
}

export const useFeeStore = create<FeeStore>((set) => ({
  selectionMode: false,
  setSelectionMode: (selectionMode) => {
    set({ selectionMode })
  },
  selectedTransactions: [],
  setSelectedTransactions: (selectedTransactions) => {
    set({ selectedTransactions })
  },
  addSelectedTransaction: (fee) => {
    set((state) => ({ selectedTransactions: [...state.selectedTransactions, fee] }))
  },
  removeSelectedTransaction: (fee) => {
    set((state) => ({
      selectedTransactions: state.selectedTransactions.filter((f) => f.id !== fee.id),
    }))
  },
  updateSelectedTransaction: (fee) => {
    set((state) => ({
      selectedTransactions: state.selectedTransactions.map((f) => (f.id === fee.id ? fee : f)),
    }))
  },
  resetStore: () => {
    set({
      selectionMode: false,
      selectedTransactions: [],
    })
  },
}))
