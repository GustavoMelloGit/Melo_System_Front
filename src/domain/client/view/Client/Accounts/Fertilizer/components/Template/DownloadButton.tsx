import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { useGetTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { FertilizerAccountEmitter } from '../../events/FertilizerAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadFertilizerAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = useGetTransactionsFromClientService('fertilizer', uuid ?? '')
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
    FertilizerAccountEmitter.on('fertilizerSold', refetchData)
    return () => {
      FertilizerAccountEmitter.off('fertilizerSold', refetchData)
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
