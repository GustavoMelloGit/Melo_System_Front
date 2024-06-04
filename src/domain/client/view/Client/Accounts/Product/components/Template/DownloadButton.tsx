import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { ProductAccountEmitter } from '../../events/ProductAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadProductAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = getTransactionsFromClientService('fertilizer', uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

  useEffect(() => {
    ProductAccountEmitter.on('productSold', refetchData)
    return () => {
      ProductAccountEmitter.off('productSold', refetchData)
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
