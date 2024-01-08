import { useState } from 'react'
import { type Option } from './types'

type State = {
  options: Option[]
  showOptions: boolean
}

type Actions = {
  setOptions: (options: Option[]) => void
  setShowOptions: (showOptions: boolean) => void
  resetState: () => void
}

const useAutocomplete = (): [State, Actions] => {
  const initialState: State = {
    options: [],
    showOptions: false,
  }

  const [state, setState] = useState<State>(initialState)

  const setOptions = (options: Option[]): void => {
    setState((prevState) => ({ ...prevState, options }))
  }

  const setShowOptions = (showOptions: boolean): void => {
    setState((prevState) => ({ ...prevState, showOptions }))
  }

  const resetState = (): void => {
    setState(initialState)
  }

  const actions: Actions = {
    setOptions,
    setShowOptions,
    resetState,
  }

  return [state, actions]
}

export default useAutocomplete
