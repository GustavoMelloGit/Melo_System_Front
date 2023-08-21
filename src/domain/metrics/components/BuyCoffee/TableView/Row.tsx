import { Tr } from '@chakra-ui/react'
import { type BuyCoffeeMetric } from '../../../types/coffeePriceMetrics'

type Props = {
  metric: BuyCoffeeMetric
}
export default function BuyCoffeeMetricsTableViewRow({ metric }: Props): JSX.Element {
  return <Tr></Tr>
}
