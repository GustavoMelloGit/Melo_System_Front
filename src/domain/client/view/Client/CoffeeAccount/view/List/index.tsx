import { Stack } from '@chakra-ui/react'
import CoffeeAccountTable from '../../components/List'
import useCoffeeAccountView from './useView'

export default function CoffeeAccountView(): JSX.Element {
  const { data, isLoading, total } = useCoffeeAccountView()

  return (
    <Stack spacing={4}>
      <CoffeeAccountTable data={data} isLoading={isLoading} totalLength={total} />
    </Stack>
  )
}
