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
    urlSearchParams.set(key, String(value))
    setUrlSearchParams(urlSearchParams)
  }

  function handleAddParams(params: Record<string, string>): void {
    Object.keys(params).forEach((key) => {
      urlSearchParams.set(key, params[key])
    })
    setUrlSearchParams(urlSearchParams)
  }

  function handleRemoveParam(key: string): void {
    urlSearchParams.delete(key)
    setUrlSearchParams(urlSearchParams)
  }

  function handleRemoveParams(keys: string[]): void {
    keys.forEach((key) => {
      urlSearchParams.delete(key)
    })
    setUrlSearchParams(urlSearchParams)
  }

  function handleRemoveAllParams(): void {
    setUrlSearchParams(new URLSearchParams())
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
