import { Td } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import { ClientNameParser } from '../../../../../lib/utils/ClientNameParser'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { type ClientModel } from '../../../../client/types/model/Client'

type Props = {
  client: ClientModel
}
export default function InadimplentesMetricsTableViewRow({ client }: Props): JSX.Element {
  return (
    <LinkRow>
      <Td>{client.code}</Td>
      <Td>
        <LinkRow.Link to={Routes.clientPage(client.id)}>
          {ClientNameParser.addNickname(client.name, client.nickname)}
        </LinkRow.Link>
      </Td>
      <Td>{client.address?.brook}</Td>
      <Td>{formatCurrency(client.balance)}</Td>
    </LinkRow>
  )
}
