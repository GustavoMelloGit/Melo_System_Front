import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { useGetTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { FertilizerAccountEmitter } from '../../events/FertilizerAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadFertilizerAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = useGetTransactionsFromClientService('fertilizer', uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    FertilizerAccountEmitter.on('fertilizerSold', refetchData)
    return () => {
      FertilizerAccountEmitter.off('fertilizerSold', refetchData)
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
