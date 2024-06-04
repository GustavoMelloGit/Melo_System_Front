import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { EscolhaAccountEmitter } from '../../events/EscolhaAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadEscolhaAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = getTransactionsFromClientService('escolha', uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    EscolhaAccountEmitter.on('escolhaBought', refetchData)
    EscolhaAccountEmitter.on('escolhaCreated', refetchData)
    return () => {
      EscolhaAccountEmitter.off('escolhaBought', refetchData)
      EscolhaAccountEmitter.off('escolhaCreated', refetchData)
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
