import { Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { formatCurrency } from '../../../../../lib/utils/formatters'
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
        {client.code} - {client.name}
      </CollapsibleTd>
      <Td>{formatCurrency(valuePerBag)}</Td>
      <Td>{getNumberOfBags(weight)}</Td>
    </Tr>
  )
}
