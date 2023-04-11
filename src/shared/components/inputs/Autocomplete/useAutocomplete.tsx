import { type ReactNode } from 'react'
import { create } from 'zustand'

type State = {
  inputValue: string
  options: string[]
  selectedOption: ReactNode
  showOptions: boolean
}

type Actions = {
  setInputValue: (inputValue: string) => void
  setOptions: (options: string[]) => void
  selectOption: (option: ReactNode) => void
  setShowOptions: (showOptions: boolean) => void
  resetState: () => void
}

const initialState: State = {
  inputValue: '',
  options: [],
  selectedOption: null,
  showOptions: false,
}

export const useAutocompleteStore = create<State & Actions>((set) => ({
  ...initialState,
  setInputValue: (inputValue) => {
    set((state) => ({ ...state, inputValue }))
  },
  setOptions: (options) => {
    set((state) => ({ ...state, options }))
  },
  selectOption: (option) => {
    set((state) => ({ ...state, selectedOption: option }))
  },
  setShowOptions: (showOptions) => {
    set((state) => ({ ...state, showOptions }))
  },
  resetState: () => {
    set((state) => ({ ...state, ...initialState }))
  },
}))
