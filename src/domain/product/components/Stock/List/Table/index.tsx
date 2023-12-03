import { toast } from 'react-hot-toast'
import Table from '../../../../../../shared/components/table/Table'
import {
  type SearchForOption,
  type TableHeaderColumns,
} from '../../../../../../shared/components/table/types'
import { useModal } from '../../../../../../shared/hooks/useModal'
import { deleteFertilizerService } from '../../../../../fertilizer/services/delete'
import { type ProductModel } from '../../../../types/Product'
import StockTableRow from './Row'

type Props = {
  data: ProductModel[] | undefined
  totalBooks: number
  isLoading: boolean
  refetch: () => void
}
const StockTable = ({ data, isLoading, totalBooks, refetch }: Props): JSX.Element => {
  const openModal = useModal((state) => state.openModal)
  async function handleDeleteFertilizer(id: string): Promise<void> {
    const { error } = await deleteFertilizerService(id)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Produto removido com sucesso!')
    refetch()
  }
  async function handleCreditFertilizer(fertilizer: ProductModel): Promise<void> {
    const CreditFertilizer = (await import('../Credit')).default
    openModal(<CreditFertilizer fertilizer={fertilizer} refetch={refetch} />)
  }

  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum produto encontrado.',
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
        <StockTableRow
          key={fertilizer.id}
          fertilizer={fertilizer}
          onClickDelete={handleDeleteFertilizer}
          onClickCredit={handleCreditFertilizer}
        />
      ))}
    </Table>
  )
}
export default StockTable

const headerColumns: TableHeaderColumns[] = [
  {
    id: 'createdAt',
    label: 'Data de criação',
  },
  {
    id: 'name',
    label: 'Produto',
  },
  {
    id: 'quantity',
    label: 'Estoque',
  },
  {
    id: 'cost',
    label: 'Preço de custo',
  },
  {
    id: 'sale',
    label: 'Preço de venda',
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
