import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { CheckingAccountEmitter } from '../../events/CheckingAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadCheckingAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = getTransactionsFromClientService('currency', uuid ?? '')
  const [instance, updateInstance] = usePDF({
    document: <CoffeePriceMetricsTemplate data={data ?? []} />,
  })

  const updatePdfInstance = useCallback(async () => {
    updateInstance(<CoffeePriceMetricsTemplate data={data ?? []} />)
  }, [data, updateInstance])

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  useEffect(() => {
    CheckingAccountEmitter.on('transactionCreated', refetchData)
    return () => {
      CheckingAccountEmitter.off('transactionCreated', refetchData)
    }
  }, [refetchData])

  return (
    <DownloadButton
      instance={instance}
      aria-label='Imprimir movimentações da conta'
      title='Imprimir movimentações da conta'
    />
  )
}
