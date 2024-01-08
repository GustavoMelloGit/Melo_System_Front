import { useNavigate } from 'react-router'
import useURLSearchParams from './useURLSearchParams'

// ----------------------------------------------------------------------

type Config = {
  /**
   * Remove all query params from URL on change tab
   * @example
   * If True:
   * // /users?name=Jose&tab=1 => /users?tab=2
   * If False:
   * // /users?name=Jose&tab=1 => /users?name=Jose&tab=2
   */
  resetOnChange: boolean
  queryName: string
  defaultValue: string | undefined
}
const initialConfig: Config = {
  resetOnChange: false,
  queryName: 'tab',
  defaultValue: undefined,
}
export default function useTabs(config?: Partial<Config>): UseTabs {
  const hookConfig: Config = {
    ...initialConfig,
    ...config,
  }
  const { queryName, resetOnChange } = hookConfig
  const navigate = useNavigate()
  const { handleAddParam, getParam } = useURLSearchParams()

  function handleChangeTab(newValue: string): void {
    if (resetOnChange) {
      navigate(`?${queryName}=${newValue}`)
    } else {
      handleAddParam(queryName, newValue)
    }
  }
  return {
    currentTab: getParam(queryName) ?? config?.defaultValue,
    onChangeTab: handleChangeTab,
  }
}

type UseTabs = {
  currentTab: string | undefined
  onChangeTab: (newValue: string) => void
}
