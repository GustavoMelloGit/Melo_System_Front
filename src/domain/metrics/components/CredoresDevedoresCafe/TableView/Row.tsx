import { Td } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { Routes } from '../../../../../lib/routes'
import { getNumberOfBags } from '../../../../../lib/utils/getNumberOfBags'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { type ClientCoffeeMetric } from '../../../types/credoresDevedoresCafeMetrics'

type Props = {
  client: ClientCoffeeMetric
}
export default function CredoresDevedoresCafeMetricsTableViewRow({ client }: Props): JSX.Element {
  return (
    <LinkRow to={Routes.clientPage(client.id)}>
      <Td>{client.code}</Td>
      <CollapsibleTd>{client.name}</CollapsibleTd>
      <Td>{capitalCase(client.balance.type)}</Td>
      <Td>{getNumberOfBags(client.balance.total)}</Td>
    </LinkRow>
  )
}
