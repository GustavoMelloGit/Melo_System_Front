import { Td, Tr } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { format } from 'date-fns'
import { Routes } from '../../../../../lib/routes'
import { formatClientName, formatCurrency } from '../../../../../lib/utils/formatters'
import Link from '../../../../../shared/components/Link'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
import { getNumberOfBags } from '../../../../coffee/utils/Coffee'
import { type BuyCoffeeMetrics } from '../../../types/buy-coffee-metrics'

type Props = {
  metric: BuyCoffeeMetrics
}
export default function BuyCoffeeMetricsTableViewRow({ metric }: Props): JSX.Element {
  const { client, date, valuePerBag, weight, coffeeType, bebida } = metric
  return (
    <Tr>
      <Td>{format(date, 'dd/MM/yyyy')}</Td>
      <CollapsibleTd>
        <Link to={Routes.clientPage(client.id)}>{formatClientName(client)}</Link>
      </CollapsibleTd>
      <Td>{capitalCase(coffeeType)}</Td>
      <Td>{capitalCase(bebida)}</Td>
      <Td>{formatCurrency(valuePerBag)}</Td>
      <Td>{getNumberOfBags(weight)}</Td>
    </Tr>
  )
}
