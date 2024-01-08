import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { type TransactionMetrics } from '../../../types/transactionMetrics'
import MetricsDownloadButton from '../../MetricsDownloadButton'
import TransactionsMetricsTemplate from './Template'

type Props = {
  data: TransactionMetrics[]
}
export default function TransactionsMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <TransactionsMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<TransactionsMetricsTemplate data={data} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <MetricsDownloadButton
      instance={instance}
      aria-label='Baixar relatório de transações'
      data-cy='download-transactions-metrics'
      title='Baixar relatório de transações'
    />
  )
}
