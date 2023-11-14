import { Td } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { Routes } from '../../../../../lib/routes'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { type ClientCoffeeMetric } from '../../../types/credoresDevedoresCafeMetrics'

type Props = {
  client: ClientCoffeeMetric
}
export default function CredoresDevedoresCafeMetricsTableViewRow({ client }: Props): JSX.Element {
  return (
    <LinkRow>
      <Td>{client.code}</Td>
      <Td>
        <LinkRow.Link to={Routes.clientPage(client.id)}>{client.name}</LinkRow.Link>
      </Td>
      <Td>{capitalCase(client.balance.type)}</Td>
      <Td>{getNumberOfBags(client.balance.total)}</Td>
    </LinkRow>
  )
}
