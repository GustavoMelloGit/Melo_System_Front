import { Td, Tr } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import { type BuyCoffeeMetric } from '../../../types/coffeePriceMetrics'

type Props = {
  metric: BuyCoffeeMetric
}
export default function BuyCoffeeMetricsTableViewRow({ metric }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{capitalCase(metric.type)}</Td>
      <Td>{formatCurrency(metric.value)}</Td>
      <Td>{getNumberOfBags(metric.weight)}</Td>
    </Tr>
  )
}
