import { Avatar, HStack, Td } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { centsToCurrency, formatCurrency } from '../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../lib/utils/getColorByValue'
import IconButton from '../../../../../shared/components/IconButton'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { type ClientModel } from '../../../types/model/Client'

export type ClientsTableRowProps = {
  client: ClientModel
  onRemove: (id: string) => void
}
export default function ClientsTableRow({ client, onRemove }: ClientsTableRowProps): JSX.Element {
  const [showBalance, setShowBalance] = useState<boolean>(false)
  function handleToggleBalance(): void {
    setShowBalance((prev) => !prev)
  }
  const clientBalance = centsToCurrency(client.balance)

  return (
    <LinkRow>
      <Td textAlign='center' data-cy='table-cell-client-avatar'>
        <Avatar loading='lazy' src={client.profileImage} name={client.name} />
      </Td>
      <Td data-cy='table-cell-client-name'>
        <LinkRow.Link to={Routes.clientPage(client.id)}>{client.name}</LinkRow.Link>
      </Td>
      <Td data-cy='table-cell-client-nickname'>{client.nickname ?? '--'}</Td>
      <Td
        onClick={handleToggleBalance}
        cursor='pointer'
        color={showBalance ? getColorByValue(clientBalance) : 'inherit'}
        data-cy='table-cell-client-balance'
        data-balance={clientBalance}
        zIndex={1}
        pos='relative'
        userSelect='none'
        minW={28}
      >
        {showBalance ? formatCurrency(clientBalance) : 'R$ ----'}
      </Td>
      <Td title={client?.contact?.phone} data-cy='table-cell-client-phone'>
        {client?.contact?.phone}
      </Td>
      <Td textAlign='center' data-cy='table-cell-client-actions'>
        <HStack w='full' justify='center'>
          <Link to={Routes.updateClient(client.id)} data-cy={`edit-client-${client.id}`}>
            <IconButton
              icon='edit'
              role='button'
              colorScheme='blue'
              as='span'
              aria-label='Editar cliente'
            />
          </Link>
          <IconButton
            icon='remove'
            colorScheme='red'
            zIndex={1}
            cursor='pointer'
            as='span'
            role='button'
            aria-label='Editar cliente'
            onClick={() => {
              onRemove(client.id)
            }}
          />
        </HStack>
      </Td>
    </LinkRow>
  )
}
