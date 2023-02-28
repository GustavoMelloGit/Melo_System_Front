import { Avatar, HStack, Td, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import { formatCurrency } from '../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../lib/utils/styles'
import TableEditButton from '../../../../shared/components/table/buttons/Edit'
import TableLinkToButton from '../../../../shared/components/table/buttons/LinkTo'
import { type ClientModel } from '../../types/model/Client'

export type ClientsTableRowProps = {
  client: ClientModel
}
export default function ClientsTableRow({ client }: ClientsTableRowProps): JSX.Element {
  const [showBalance, setShowBalance] = useState<boolean>(false)
  function handleToggleBalance(): void {
    setShowBalance((prev) => !prev)
  }
  return (
    <Tr>
      <Td textAlign='center'>
        <Avatar loading='lazy' src={client.profileImage} name={client.name} />
      </Td>
      <Td
        title={client.name}
        maxW={40}
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
        data-cy='table-row-client-name'
      >
        {client.name}
      </Td>
      <Td title={client.nickname}>{client.nickname}</Td>
      <Td
        onClick={handleToggleBalance}
        cursor='pointer'
        color={showBalance ? getColorByValue(client.balance) : 'inherit'}
      >
        {showBalance ? formatCurrency(client.balance) : 'R$ ----'}
      </Td>
      <Td>{client?.contact?.phone}</Td>
      <Td textAlign='center'>
        <HStack w='full' justify='center'>
          <Link to={Routes.updateClient(client.id)}>
            <TableEditButton as='span' aria-label='Editar cliente' />
          </Link>
          <Link to={Routes.clientPage(client.id)}>
            <TableLinkToButton aria-label='Ver cliente' />
          </Link>
        </HStack>
      </Td>
    </Tr>
  )
}
