import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { type CoffeePriceMetrics } from '../../../types/buyCoffeeMetrics'
import MetricsDownloadButton from '../../MetricsDownloadButton'
import CoffeePriceMetricsTemplate from './Template'

type Props = {
  data: CoffeePriceMetrics[]
}
export default function CoffeePriceMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <CoffeePriceMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<CoffeePriceMetricsTemplate data={data} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <MetricsDownloadButton
      instance={instance}
      aria-label='Baixar relatório de preço de café'
      data-cy='download-coffee-price-metrics'
      title='Baixar relatório de preço de café'
    />
  )
}
