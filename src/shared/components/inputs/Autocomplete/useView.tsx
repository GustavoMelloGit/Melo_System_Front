import { useCallback, useMemo, useState } from 'react'
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

const initialState: State = {
  options: [],
  showOptions: false,
}
const useAutocomplete = (): [State, Actions] => {
  const [state, setState] = useState<State>(initialState)

  const setOptions = useCallback((options: Option[]): void => {
    setState((prevState) => ({ ...prevState, options }))
  }, [])

  const setShowOptions = useCallback((showOptions: boolean): void => {
    setState((prevState) => ({ ...prevState, showOptions }))
  }, [])

  const resetState = useCallback((): void => {
    setState(initialState)
  }, [])

  const actions: Actions = useMemo(
    () => ({
      setOptions,
      setShowOptions,
      resetState,
    }),
    [resetState, setOptions, setShowOptions],
  )

  return [state, actions]
}

export default useAutocomplete
