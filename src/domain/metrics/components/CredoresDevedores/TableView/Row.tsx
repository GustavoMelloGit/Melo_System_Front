import { Td, Tr } from '@chakra-ui/react'
import { ClientNameParser } from '../../../../../lib/utils/clientNameParser'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import CollapsibleTd from '../../../../../shared/components/table/CollapsibleTd'
import { type ClientModel } from '../../../../client/types/model/Client'

type Props = {
  client: ClientModel
}
export default function CredoresDevedoresMetricsTableViewRow({ client }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{client.code}</Td>
      <CollapsibleTd>{ClientNameParser.addNickname(client.name, client.nickname)}</CollapsibleTd>
      <Td>{client.address.brook}</Td>
      <Td>{formatCurrency(client.balance)}</Td>
    </Tr>
  )
}
