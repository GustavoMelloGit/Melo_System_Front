import Table from '../../../../../shared/components/table/Table'
import {
  type CustomTableComponentProps,
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../shared/components/table/types'
import { SEARCH_CLIENT_NAME_PARAM } from '../../../constants/sheet'
import { type SheetModel } from '../../../types/model/sheet'
import SheetsTableRow from './Row'

type Props = CustomTableComponentProps<SheetModel[]>
export default function SheetsTable({ data, isLoading, totalLength }: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhuma folha encontrada',
      }}
      pagination={{
        totalLength,
      }}
      filter={{
        searchForOptions,
      }}
      table={{
        'data-cy': 'coffee-book-table',
      }}
    >
      {data?.map((sheet) => (
        <SheetsTableRow key={sheet.number} sheet={sheet} />
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
  [SEARCH_CLIENT_NAME_PARAM]: {
    label: 'Nome do cliente',
  },
}
