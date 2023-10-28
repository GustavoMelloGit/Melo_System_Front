import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import DownloadButton from '../../../../../shared/components/DownloadButton'
import { type ClientCoffeeMetric } from '../../../types/credoresDevedoresCafeMetrics'
import CredoresDevedoresCafeMetricsTemplate from './Template'

type Props = {
  data: ClientCoffeeMetric[]
}
export default function CredoresDevedoresCafeMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <CredoresDevedoresCafeMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<CredoresDevedoresCafeMetricsTemplate data={data} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <DownloadButton
      instance={instance}
      aria-label='Baixar relatório credores e devedores de café'
      data-cy='download-credores-devedores-coffee-metrics'
      title='Baixar relatório credores e devedores de café'
    />
  )
}
