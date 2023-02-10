import { Avatar, HStack, Td, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import { formatCurrency } from '../../../../lib/utils/utils'
import TableEditButton from '../../../../shared/components/table/Buttons/Edit'
import TableLinkToButton from '../../../../shared/components/table/Buttons/LinkTo'
import { type ClientModel } from '../../types/model/Client'

export type ClientsTableRowProps = {
  client: ClientModel
}
export default function ClientsTableRow({ client }: ClientsTableRowProps): JSX.Element {
  const navigate = useNavigate()
  const [showBalance, setShowBalance] = useState<boolean>(false)

  function handleToggleBalance(): void {
    setShowBalance((prev) => !prev)
  }

  function handleNavigateToClient(): void {
    navigate(Routes.clientPage(client.id))
  }
  function handleUpdateClient(): void {
    navigate(Routes.updateClient(client.id))
  }
  return (
    <Tr>
      <Td>
        <Avatar loading='lazy' src={client.profileImage} name={client.name} />
      </Td>
      <Td
        title={client.name}
        maxW={40}
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
      >
        {client.name}
      </Td>
      <Td title={client.nickname}>{client.nickname}</Td>
      <Td onClick={handleToggleBalance} cursor='pointer'>
        {showBalance ? formatCurrency(client.balance ?? 0) : 'R$ ----'}
      </Td>
      <Td>{client?.contact?.phone}</Td>
      <Td textAlign='center'>
        <HStack w='full' justify='center'>
          <TableEditButton aria-label='Editar cliente' onClick={handleUpdateClient} />
          <TableLinkToButton aria-label='Ver cliente' onClick={handleNavigateToClient} />
        </HStack>
      </Td>
    </Tr>
  )
}
