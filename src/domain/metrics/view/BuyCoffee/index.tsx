import { Center } from '@chakra-ui/react'
import InDevelopmentTag from '../../../../shared/components/InDevelopmentTag'
import useBuyCoffeeMetricsView from './useView'

export default function BuyCoffeeMetricsView(): JSX.Element {
  useBuyCoffeeMetricsView()
  return (
    <Center flex={1}>
      <InDevelopmentTag />
    </Center>
  )
}
