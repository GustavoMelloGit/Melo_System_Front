import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type PickupCoffee } from '../../../types/model/pickup'
import PickupTableRow from './Row'

type Props = {
  data: PickupCoffee[] | undefined
  isLoading: boolean
  totalPickups: number
  onClickUpdate: (pickup: PickupCoffee) => Promise<void>
  onClickCheck: (pickup: PickupCoffee) => Promise<void>
}
export default function PickupTable({
  data,
  isLoading,
  totalPickups,
  onClickUpdate,
  onClickCheck,
}: Props): JSX.Element {
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
        <PickupTableRow
          key={index}
          pickup={pickup}
          onClickUpdate={onClickUpdate}
          onClickCheck={onClickCheck}
        />
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
