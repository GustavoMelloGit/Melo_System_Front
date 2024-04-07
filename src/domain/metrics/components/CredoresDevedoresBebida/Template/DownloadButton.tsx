import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { type CreditorsAndDebtorsBebidaMetric } from '../../../types/creditorsAndDebtorsBebidaMetrics'
import MetricsDownloadButton from '../../MetricsDownloadButton'
import CredoresDevedoresCafeMetricsTemplate from './Template'

type Props = {
  data: CreditorsAndDebtorsBebidaMetric[]
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
    <MetricsDownloadButton
      instance={instance}
      aria-label='Baixar relatório credores e devedores de café'
      data-cy='download-credores-devedores-coffee-metrics'
      title='Baixar relatório credores e devedores de café'
    />
  )
}
