import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type UserModel } from '../../../../auth/types/model/user'
import { type BookModel } from '../../../types/model/entry'
import BookTableRow from './Row'

export default function CoffeeBookTable(): JSX.Element {
  const mockData: BookModel[] = [
    {
      userId: 'user1',
      number: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      sheets: [],
      user: {} as UserModel,
    },
  ]
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading: false,
        dataLength: mockData.length,
        noDataMessage: 'Nenhum talão encontrado',
      }}
      pagination={{
        dataLength: mockData.length,
        totalLength: mockData.length,
      }}
      table={{
        'data-cy': 'coffee-book-table',
      }}
    >
      {mockData.map((book) => (
        <BookTableRow key={book.number} book={book} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'number',
    label: 'Número',
    isSortable: true,
  },
  {
    id: 'createdAt',
    label: 'Data de criação',
    isSortable: true,
  },
  {
    id: 'actions',
    label: 'Ações',
    align: 'center',
  },
]
