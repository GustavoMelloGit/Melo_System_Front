import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { CheckingAccountEmitter } from '../../events/CheckingAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadCheckingAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = getTransactionsFromClientService('currency', uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    CheckingAccountEmitter.on('transactionCreated', refetchData)
    return () => {
      CheckingAccountEmitter.off('transactionCreated', refetchData)
    }
  }, [refetchData])

  return (
    <DownloadButton
      template={<CoffeePriceMetricsTemplate data={data ?? []} />}
      aria-label='Imprimir movimentações da conta'
      title='Imprimir movimentações da conta'
    />
  )
}
