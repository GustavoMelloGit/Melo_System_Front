import { Avatar, IconButton, Td, Tr } from '@chakra-ui/react'
import { useState } from 'react'
import { TbPencil } from 'react-icons/tb'
import { type ClientModel } from '../../types/model/Client'

export type ClientsTableRowProps = {
  client: ClientModel
  onUpdateClient: (uuid: string) => void
}
export default function ClientsTableRow({
  client,
  onUpdateClient,
}: ClientsTableRowProps): JSX.Element {
  const [showBalance, setShowBalance] = useState<boolean>(false)

  const handleToggleBalance = (): void => {
    setShowBalance((prev) => !prev)
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
        {showBalance
          ? Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(client?.balance ?? 0)
          : 'R$ ----'}
      </Td>
      <Td>{client?.contact?.phone}</Td>
      <Td textAlign='center'>
        <IconButton
          aria-label='Editar cliente'
          icon={<TbPencil />}
          variant='ghost'
          onClick={() => {
            onUpdateClient(client.id)
          }}
        />
      </Td>
    </Tr>
  )
}
