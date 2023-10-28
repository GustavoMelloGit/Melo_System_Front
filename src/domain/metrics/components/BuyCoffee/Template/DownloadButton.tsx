import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import DownloadButton from '../../../../../shared/components/DownloadButton'
import { type BuyCoffeeMetric } from '../../../types/coffeePriceMetrics'
import BuyCoffeeMetricsTemplate from './Template'

type Props = {
  data: BuyCoffeeMetric[]
}
export default function BuyCoffeeMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <BuyCoffeeMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<BuyCoffeeMetricsTemplate data={data} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <DownloadButton
      instance={instance}
      aria-label='Baixar relatório de compras de café'
      data-cy='download-buy-coffee-metrics'
      title='Baixar relatório de compras de café'
    />
  )
}
