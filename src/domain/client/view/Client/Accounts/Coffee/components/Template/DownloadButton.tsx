import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DownloadButton from '../../../../../../../../shared/components/buttons/DownloadButton'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import { CoffeeAccountEmitter } from '../../events/CoffeeAccountEmitter'
import CoffeePriceMetricsTemplate from './Template'

export default function DownloadCoffeeAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const { data, mutate } = getTransactionsFromClientService('coffee', uuid ?? '')

  const refetchData = useCallback(async () => {
    await mutate()
  }, [mutate])

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
      template={<CoffeePriceMetricsTemplate data={data ?? []} />}
      aria-label='Imprimir movimentações da conta'
      title='Imprimir movimentações da conta'
    />
  )
}
