import { Td } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import { ClientNameParser } from '../../../../../lib/utils/ClientNameParser'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { type OwingCurrencyWithPositiveCoffeeClient } from '../../../types/owingCurrencyWithPositiveCoffee'

type Props = {
  client: OwingCurrencyWithPositiveCoffeeClient
}

function getCoffeeBalance(client: OwingCurrencyWithPositiveCoffeeClient): number {
  if (client.coffeeBalance !== undefined) return client.coffeeBalance
  if (client.coffeeWeight !== undefined) return client.coffeeWeight
  return client.balances?.coffee ?? 0
}

export default function OwingCurrencyWithPositiveCoffeeMetricsTableViewRow({
  client,
}: Props): JSX.Element {
  const coffeeBalance = getCoffeeBalance(client)

  return (
    <LinkRow>
      <Td>{client.code}</Td>
      <Td>
        <LinkRow.Link to={Routes.clientPage(client.id)}>
          {ClientNameParser.addNickname(client.name, client.nickname)}
        </LinkRow.Link>
      </Td>
      <Td>{formatCurrency(client.balance)}</Td>
      <Td>{getNumberOfBags(coffeeBalance)}</Td>
    </LinkRow>
  )
}
