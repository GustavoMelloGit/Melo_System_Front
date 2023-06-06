import { toast } from 'react-hot-toast'
import Table from '../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../shared/components/table/types'
import { deleteFertilizerService } from '../../services/delete'
import { type FertilizerModel } from '../../types/model/Fertilizer'
import FertilizerTableRow from './Row'

type Props = {
  data: FertilizerModel[] | undefined
  totalBooks: number
  isLoading: boolean
  refetch: () => void
}
const FertilizerTable = ({ data, isLoading, totalBooks, refetch }: Props): JSX.Element => {
  async function handleDeleteFertilizer(id: string): Promise<void> {
    const { error } = await deleteFertilizerService(id)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Adubo deletado com sucesso!')
    refetch()
  }
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
        <FertilizerTableRow
          key={fertilizer.name}
          fertilizer={fertilizer}
          onClickDelete={handleDeleteFertilizer}
        />
      ))}
    </Table>
  )
}
export default FertilizerTable

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'createdAt',
    label: 'Data de criação',
  },
  {
    id: 'name',
    label: 'Nome',
  },
  {
    id: 'description',
    label: 'Descrição',
  },
  {
    id: 'actions',
    label: 'Ações',
    textAlign: 'center',
  },
]

const searchForOptions: SearchForOption = {
  name: {
    label: 'Nome',
  },
}
