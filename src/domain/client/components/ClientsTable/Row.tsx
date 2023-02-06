import { Avatar, HStack, IconButton, Td, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { TbPencil } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import { formatCurrency } from '../../../../lib/utils/utils'
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
          <IconButton
            aria-label='Editar cliente'
            icon={<TbPencil size={20} />}
            variant='ghost'
            onClick={handleUpdateClient}
          />
          <IconButton
            aria-label='Ver cliente'
            icon={<HiArrowTopRightOnSquare size={20} />}
            variant='ghost'
            onClick={handleNavigateToClient}
          />
        </HStack>
      </Td>
    </Tr>
  )
}
