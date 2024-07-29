import { Td, Tr } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { format } from 'date-fns'
import { Routes } from '../../../../../lib/routes'
import {
  centsToCurrency,
  formatClientName,
  formatCurrency,
} from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import Link from '../../../../../shared/components/Link'
import { type CoffeePriceMetrics } from '../../../types/buyCoffeeMetrics'

type Props = {
  metric: CoffeePriceMetrics
}
export default function CoffeePriceMetricsTableViewRow({ metric }: Props): JSX.Element {
  const { client, date, valuePerBag, weight, coffeeType, bebida } = metric
  return (
    <Tr>
      <Td>{format(date, 'dd/MM/yyyy')}</Td>
      <Td>
        <Link to={Routes.clientPage(client.id)}>{formatClientName(client)}</Link>
      </Td>
      <Td>{capitalCase(coffeeType)}</Td>
      <Td>{capitalCase(bebida)}</Td>
      <Td>{formatCurrency(centsToCurrency(valuePerBag))}</Td>
      <Td>{getNumberOfBags(weight)}</Td>
    </Tr>
  )
}
