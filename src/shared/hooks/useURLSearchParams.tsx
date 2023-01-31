import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useURLSearchParams(): UseParams {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams()
  const allSearchParams: Record<string, string> = useMemo(
    () =>
      Array.from(urlSearchParams.keys()).reduce(
        (acc, val) => ({ ...acc, [val]: urlSearchParams.get(val) }),
        {},
      ),
    [urlSearchParams],
  )

  function handleAddParam(key: string, value: string | number): void {
    setUrlSearchParams({ ...allSearchParams, [key]: value.toString() })
  }

  function handleAddParams(params: Record<string, string>): void {
    setUrlSearchParams({ ...allSearchParams, ...params })
  }

  function handleRemoveParam(key: string): void {
    const { [key]: _, ...rest } = allSearchParams
    setUrlSearchParams(rest)
  }

  function handleRemoveParams(keys: string[]): void {
    const newParams = keys.reduce((acc, val) => {
      const { [val]: _, ...rest } = acc
      return rest
    }, allSearchParams)
    setUrlSearchParams(newParams)
  }

  function handleRemoveAllParams(): void {
    setUrlSearchParams({})
  }

  function getParam(key: string): string | null {
    return urlSearchParams.get(key)
  }

  return {
    handleAddParam,
    handleRemoveParam,
    handleRemoveAllParams,
    getParam,
    handleAddParams,
    handleRemoveParams,
    allSearchParams,
  }
}

export type UseParams = {
  handleAddParam: (key: string, value: string | number) => void
  handleRemoveParam: (key: string) => void
  handleRemoveAllParams: () => void
  getParam: (key: string) => string | null
  handleAddParams: (params: Record<string, string>) => void
  handleRemoveParams: (keys: string[]) => void
  allSearchParams: Record<string, string>
}
