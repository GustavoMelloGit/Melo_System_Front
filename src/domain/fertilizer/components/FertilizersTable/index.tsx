import { Avatar, IconButton, Td, Tr } from '@chakra-ui/react'
import { TbPencil } from 'react-icons/tb'
import Table from '../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../shared/components/table/types'

type ClientsTableProps = {
  data: any[] | undefined
  isLoading: boolean
  onUpdateAction: (uuid: string) => void
}
export default function FertilizersTable({
  data,
  isLoading,
  onUpdateAction,
}: ClientsTableProps): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum adubo encontrado',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
      }}
      filter={{
        searchForOptions,
      }}
    >
      {data?.map((client, index) => (
        <Tr key={index}>
          <Td>
            <Avatar loading='lazy' src={client.profileImage} />
          </Td>
          <Td>{client.name}</Td>
          <Td>{client.nickname}</Td>
          <Td>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Math.random() * 1000)}
          </Td>
          <Td>(32) 99999-9999</Td>
          <Td>
            <IconButton
              aria-label='Editar cliente'
              icon={<TbPencil />}
              variant='ghost'
              onClick={() => {
                onUpdateAction(client.id)
              }}
            />
          </Td>
        </Tr>
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'brand', label: 'Marca' },
  { id: 'chemistry', label: 'Fórmula' },
  { id: 'actions', label: 'Ações' },
]
const searchForOptions: SearchForOption[] = [
  {
    label: 'Marca',
    value: 'brand',
  },
]
