import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { useGetTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { EscolhaAccountEmitter } from '../../events/EscolhaAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadEscolhaAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = useGetTransactionsFromClientService('escolha', uuid ?? '')
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
    EscolhaAccountEmitter.on('escolhaBought', refetchData)
    EscolhaAccountEmitter.on('escolhaCreated', refetchData)
    return () => {
      EscolhaAccountEmitter.off('escolhaBought', refetchData)
      EscolhaAccountEmitter.off('escolhaCreated', refetchData)
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
