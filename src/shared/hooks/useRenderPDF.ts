import { pdf } from '@react-pdf/renderer'
import { useCallback } from 'react'

function openNewTab(url: string): void {
  window.open(url, '_blank')
}

export default function useRenderPDF(): UseRenderPDF {
  const render = useCallback(async (template: JSX.Element): Promise<void> => {
    const blob = await pdf(template).toBlob()
    const url = URL.createObjectURL(blob)
    openNewTab(url)
  }, [])

  return {
    render,
    loading: false,
    error: null,
  }
}

type UseRenderPDF = {
  render: (template: JSX.Element) => Promise<void>
  loading: boolean
  error: string | null
}
