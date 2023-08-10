import { Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { Routes } from '../../../../../lib/routes'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import Link from '../../../../../shared/components/Link'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
import { getNumberOfBags } from '../../../../coffee/utils/Coffee'
import { type BuyCoffeeMetrics } from '../../../types/buy-coffee-metrics'

type Props = {
  metric: BuyCoffeeMetrics
}
export default function BuyCoffeeMetricsTableViewRow({ metric }: Props): JSX.Element {
  const { client, date, valuePerBag, weight } = metric
  return (
    <Tr>
      <Td>{format(date, 'dd/MM/yyyy')}</Td>
      <CollapsibleTd>
        <Link to={Routes.clientPage(client.id)}>
          {client.code} - {client.name}
        </Link>
      </CollapsibleTd>
      <Td>{formatCurrency(valuePerBag)}</Td>
      <Td>{getNumberOfBags(weight)}</Td>
    </Tr>
  )
}
