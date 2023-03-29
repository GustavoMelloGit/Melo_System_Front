import Table from '../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../shared/components/table/types'
import { type SheetModel } from '../../../types/model/sheet'
import SheetsTableRow from './Row'

type Props = {
  data: SheetModel[] | undefined
  totalBooks: number
  isLoading: boolean
  onDeleteSheet: (sheet: SheetModel) => Promise<void>
}
export default function SheetsTable({
  data,
  isLoading,
  totalBooks,
  onDeleteSheet,
}: Props): JSX.Element {
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
      {data?.map((sheet) => (
        <SheetsTableRow
          key={sheet.number}
          sheet={sheet}
          onClickDelete={onDeleteSheet.bind(null, sheet)}
        />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'number',
    label: 'Número',
    isSortable: true,
    maxW: 100,
    defaultSort: 'desc',
  },
  {
    id: 'clientName',
    label: 'Cliente',
  },
  {
    id: 'courier',
    label: 'Motorista',
    isSortable: true,
  },
  {
    id: 'weighingDate',
    label: 'Data de pesagem',
    isSortable: true,
  },
  {
    id: 'isDraft',
    label: 'Status',
    align: 'center',
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
