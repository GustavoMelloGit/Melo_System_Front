import { Select } from '@chakra-ui/react'
import { format } from 'date-fns'
import { months } from '../../../../../lib/constants/months'
import { deepClone } from '../../../../../lib/utils/deepClone'
import { isClientBirthdayToday } from '../../../../../lib/utils/isClientBirthdayToday'
import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type ClientModel, type NaturalPerson } from '../../../types/model/Client'
import BirthdaysTableRow from './Row'

const threeHoursInMilliseconds = 1.08e7
const defaultMonth = new Date().getMonth() + 1

function orderClientsByBirthday(clients: ClientModel[]): ClientModel[] {
  const cloneClients = deepClone(clients)
  cloneClients.sort((a, b) => {
    const aDate: number = new Date(
      ((a.personType as NaturalPerson).birthDate as number) + threeHoursInMilliseconds,
    ).getDate()
    const bDate: number = new Date(
      ((b.personType as NaturalPerson).birthDate as number) + threeHoursInMilliseconds,
    ).getDate()
    return aDate - bDate
  })
  return cloneClients
}

type Props = {
  clients: ClientModel[]
  isLoading: boolean
}
export default function BirthdaysTable({ clients, isLoading }: Props): JSX.Element {
  const clientsHavingBirthdayToday = clients
    .filter(isClientBirthdayToday)
    .map((client) => client.id)

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
              <Select variant={'filled'} {...field} value={field.value || String(defaultMonth)}>
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
      {orderClientsByBirthday(clients).map((client) => (
        <BirthdaysTableRow
          key={client.id}
          client={{
            id: client.id,
            name: client.name,
            nickname: client.nickname,
            photo: client.profileImage,
            isBirthdayToday: clientsHavingBirthdayToday.includes(client.id),
            birthday:
              client.personType.type === 'fisica' && client.personType.birthDate
                ? format(
                    new Date(client.personType.birthDate + threeHoursInMilliseconds),
                    'dd/MM/yyyy',
                  )
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
