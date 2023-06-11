import { useState } from 'react'
import { type Option } from './types'

type State = {
  inputValue: string
  options: Option[]
  selectedOption: React.ReactNode
  showOptions: boolean
}

type Actions = {
  setInputValue: (inputValue: string) => void
  setOptions: (options: Option[]) => void
  selectOption: (option: React.ReactNode) => void
  setShowOptions: (showOptions: boolean) => void
  resetState: () => void
}

const useAutocomplete = (): [State, Actions] => {
  const initialState: State = {
    inputValue: '',
    options: [],
    selectedOption: null,
    showOptions: false,
  }

  const [state, setState] = useState<State>(initialState)

  const setInputValue = (inputValue: string): void => {
    setState((prevState) => ({ ...prevState, inputValue }))
  }

  const setOptions = (options: Option[]): void => {
    setState((prevState) => ({ ...prevState, options }))
  }

  const selectOption = (option: React.ReactNode): void => {
    setState((prevState) => ({ ...prevState, selectedOption: option }))
  }

  const setShowOptions = (showOptions: boolean): void => {
    setState((prevState) => ({ ...prevState, showOptions }))
  }

  const resetState = (): void => {
    setState(initialState)
  }

  const actions: Actions = {
    setInputValue,
    setOptions,
    selectOption,
    setShowOptions,
    resetState,
  }

  return [state, actions]
}

export default useAutocomplete
