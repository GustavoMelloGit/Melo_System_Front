import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import DownloadButton from '../../../../../shared/components/DownloadButton'
import { type TransactionMetrics } from '../../../types/transactionMetrics'
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
    <DownloadButton
      instance={instance}
      aria-label='Baixar relatório de transações'
      data-cy='download-transactions-metrics'
      title='Baixar relatório de transações'
    />
  )
}
