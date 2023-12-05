import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getClientService } from '../../../../../../service'
import { type ProductTransactionModel } from '../../../../../../types/model/Transaction'
import CoffeePriceMetricsTemplate from './Template'

type Props = {
  transaction: ProductTransactionModel
}
export default function DownloadSaleButton({ transaction }: Props): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data: client } = getClientService(uuid ?? '')
  const [instance, updateInstance] = usePDF({
    document: (
      <CoffeePriceMetricsTemplate
        client={client ?? ({} as any)}
        saleDate={transaction.createdAt}
        sales={transaction.sale}
      />
    ),
  })

  const updatePdfInstance = useCallback(async () => {
    if (!client) return
    updateInstance(
      <CoffeePriceMetricsTemplate
        client={client}
        saleDate={transaction.createdAt}
        sales={transaction.sale}
      />,
    )
  }, [client, transaction, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return <DownloadButton instance={instance} aria-label='Imprimir venda' title='Imprimir venda' />
}
