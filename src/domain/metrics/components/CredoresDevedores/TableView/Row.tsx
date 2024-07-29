import { Td, Tr } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import { ClientNameParser } from '../../../../../lib/utils/ClientNameParser'
import { centsToCurrency, formatCurrency } from '../../../../../lib/utils/formatters'
import Link from '../../../../../shared/components/Link'
import { type ClientModel } from '../../../../client/types/model/Client'

type Props = {
  client: ClientModel
}
export default function CredoresDevedoresMetricsTableViewRow({ client }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{client.code}</Td>
      <Td>
        <Link to={Routes.clientPage(client.id)}>
          {ClientNameParser.addNickname(client.name, client.nickname)}
        </Link>
      </Td>
      <Td>{client.address?.brook}</Td>
      <Td>{formatCurrency(centsToCurrency(client.balance))}</Td>
    </Tr>
  )
}
