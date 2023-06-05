import Table from '../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../shared/components/table/types'
import { type FertilizerModel } from '../../types/model/Fertilizer'
import FertilizerTableRow from './Row'

type Props = {
  data: FertilizerModel[] | undefined
  totalBooks: number
  isLoading: boolean
}
const FertilizerTable = ({ data, isLoading, totalBooks }: Props): JSX.Element => {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum adubo encontrado.',
      }}
      pagination={{
        totalLength: totalBooks,
      }}
      filter={{
        searchForOptions,
      }}
      table={{
        'data-cy': 'coffee-book-table',
      }}
    >
      {data?.map((fertilizer) => (
        <FertilizerTableRow key={fertilizer.name} fertilizer={fertilizer} />
      ))}
    </Table>
  )
}
export default FertilizerTable

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
