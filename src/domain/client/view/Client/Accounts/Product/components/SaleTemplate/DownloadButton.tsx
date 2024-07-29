import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getClientService } from '../../../../../../service'
import { type ProductTransactionModel } from '../../../../../../types/model/Transaction'
import { ProductAccountEmitter } from '../../events/ProductAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

type Props = {
  transaction: ProductTransactionModel
}
export default function DownloadSaleButton({ transaction }: Props): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data: client, mutate } = getClientService(uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [])

  useEffect(() => {
    ProductAccountEmitter.on('productSold', refetchData)
    return () => {
      ProductAccountEmitter.off('productSold', refetchData)
    }
  }, [])

  return (
    <DownloadButton
      template={
        <CoffeePriceMetricsTemplate
          client={client ?? ({} as any)}
          saleDate={transaction.createdAt}
          sales={transaction.sale}
        />
      }
      aria-label='Imprimir venda'
      title='Imprimir venda'
    />
  )
}
