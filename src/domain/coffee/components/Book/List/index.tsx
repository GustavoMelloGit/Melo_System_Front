import Table from '../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../shared/components/table/types'
import { type BookModel } from '../../../types/model/book'
import BookTableRow from './Row'

type Props = {
  data: BookModel[] | undefined
  totalBooks: number
  isLoading: boolean
}
export default function CoffeeBookTable({ data, isLoading, totalBooks }: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum talão encontrado',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
        totalLength: totalBooks,
      }}
      filter={{
        searchForOptions,
      }}
      table={{
        'data-cy': 'coffee-book-table',
      }}
    >
      {data?.map((book) => (
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

const searchForOptions: SearchForOption = {
  number: {
    label: 'Número',
    inputProps: {
      type: 'number',
      inputMode: 'numeric',
    },
  },
}
