import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type PickupCoffee } from '../../../types/pickup'
import PickupTableRow from './Row'

type Props = {
  data: PickupCoffee[] | undefined
  isLoading: boolean
  totalPickups: number
}
export default function PickupTable({ data, isLoading, totalPickups }: Props): JSX.Element {
  return (
    <Table
      header={{
        columns: headerColumns,
      }}
      rows={{
        isLoading,
        dataLength: data?.length ?? 0,
        noDataMessage: 'Nenhum café encontrado',
      }}
      pagination={{
        dataLength: data?.length ?? 0,
        totalLength: totalPickups,
      }}
    >
      {data?.map((pickup, index) => (
        <PickupTableRow key={index} pickup={pickup} />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'clientName', label: 'Nome do cliente', isSortable: true },
  { id: 'bags', label: 'Sacos', isSortable: true },
  { id: 'address', label: 'Endereço' },
  { id: 'actions', label: 'Ações', align: 'center' },
]
