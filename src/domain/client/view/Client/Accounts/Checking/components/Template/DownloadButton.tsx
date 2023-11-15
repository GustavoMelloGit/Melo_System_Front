import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadCheckingAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data } = getTransactionsFromClientService('currency', uuid ?? '')
  const [instance, updateInstance] = usePDF({
    document: <CoffeePriceMetricsTemplate data={data ?? []} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<CoffeePriceMetricsTemplate data={data ?? []} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <DownloadButton
      instance={instance}
      aria-label='Imprimir movimentações da conta'
      title='Imprimir movimentações da conta'
    />
  )
}
