import { type ReactNode } from 'react'
import { create } from 'zustand'
import { type Option } from './types'

type State = {
  inputValue: string
  options: Option[]
  cacheOptions: Option[]
  selectedOption: ReactNode
  showOptions: boolean
}

type Actions = {
  setInputValue: (inputValue: string) => void
  setOptions: (options: Option[]) => void
  selectOption: (option: ReactNode) => void
  setShowOptions: (showOptions: boolean) => void
  resetState: () => void
  setCacheOptions: (cacheOptions: Option[]) => void
}

const initialState: State = {
  inputValue: '',
  options: [],
  selectedOption: null,
  showOptions: false,
  cacheOptions: [],
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
  setCacheOptions: (cacheOptions) => {
    set((state) => ({ ...state, cacheOptions }))
  },
}))
