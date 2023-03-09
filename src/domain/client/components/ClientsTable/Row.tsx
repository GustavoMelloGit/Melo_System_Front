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
      <Td textAlign='center' data-cy='table-cell-client-avatar'>
        <Avatar loading='lazy' src={client.profileImage} name={client.name} />
      </Td>
      <Td
        title={client.name}
        maxW={40}
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
        data-cy='table-cell-client-name'
      >
        {client.name}
      </Td>
      <Td title={client.nickname} data-cy='table-cell-client-nickname'>
        {client.nickname}
      </Td>
      <Td
        onClick={handleToggleBalance}
        cursor='pointer'
        color={showBalance ? getColorByValue(client.balance) : 'inherit'}
        data-cy='table-cell-client-balance'
      >
        {showBalance ? formatCurrency(client.balance) : 'R$ ----'}
      </Td>
      <Td title={client?.contact?.phone} data-cy='table-cell-client-phone'>
        {client?.contact?.phone}
      </Td>
      <Td textAlign='center' data-cy='table-cell-client-actions'>
        <HStack w='full' justify='center'>
          <Link to={Routes.updateClient(client.id)}>
            <TableEditButton colorScheme='blue' as='span' aria-label='Editar cliente' />
          </Link>
          <Link to={Routes.clientPage(client.id)}>
            <TableLinkToButton aria-label='Ver cliente' />
          </Link>
        </HStack>
      </Td>
    </Tr>
  )
}
