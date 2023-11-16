import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { CoffeeAccountEmitter } from '../../events/CoffeeAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadCoffeeAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = getTransactionsFromClientService('coffee', uuid ?? '')
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
    CoffeeAccountEmitter.on('coffeeBought', refetchData)
    CoffeeAccountEmitter.on('coffeeCreated', refetchData)
    return () => {
      CoffeeAccountEmitter.off('coffeeBought', refetchData)
      CoffeeAccountEmitter.off('coffeeCreated', refetchData)
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
