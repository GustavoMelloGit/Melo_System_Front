import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function useParams(): UseParams {
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
  }
}

export type UseParams = {
  handleAddParam: (key: string, value: string | number) => void
  handleRemoveParam: (key: string) => void
  handleRemoveAllParams: () => void
  getParam: (key: string) => string | null
  handleAddParams: (params: Record<string, string>) => void
}
