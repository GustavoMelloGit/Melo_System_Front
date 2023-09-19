import { Select } from '@chakra-ui/react'
import { format } from 'date-fns'
import { months } from '../../../../../lib/constants/months'
import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type ClientModel } from '../../../types/model/Client'
import BirthdaysTableRow from './Row'

const defaultMonth = new Date().getMonth() + 1
type Props = {
  clients: ClientModel[]
  isLoading: boolean
}
export default function BirthdaysTable({ clients, isLoading }: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: clients.length,
        noDataMessage: 'Nenhum aniversariante nesse mês',
      }}
      pagination={{
        totalLength: clients.length,
      }}
      filter={{
        searchForOptions: {
          month: {
            label: 'Mês',
            Input: (field) => (
              <Select {...field} value={field.value || String(defaultMonth)}>
                {months.map((month) => (
                  <option key={month.number} value={month.number}>
                    {month.number} - {month.name}
                  </option>
                ))}
              </Select>
            ),
          },
        },
      }}
    >
      {clients.map((client) => (
        <BirthdaysTableRow
          key={client.id}
          client={{
            id: client.id,
            name: client.name,
            nickname: client.nickname,
            photo: client.profileImage,
            birthday:
              client.personType.type === 'fisica' && client.personType.birthDate
                ? format(client.personType.birthDate, 'dd/MM/yyyy')
                : '',
          }}
        />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'photo', label: 'Foto' },
  { id: 'name', label: 'Nome' },
  { id: 'nickname', label: 'Apelido' },
  { id: 'personType.birthDate', label: 'Aniversário' },
]
