import Table from '../../../../../shared/components/table/Table'
import { type TableHeaderColumns } from '../../../../../shared/components/table/types'
import { type PickupCoffeeModel } from '../../../types/model/pickup'
import PickupTableRow from './Row'

type Props = {
  data: PickupCoffeeModel[] | undefined
  isLoading: boolean
  totalPickups: number
  onClickUpdate: (pickup: PickupCoffeeModel) => Promise<void>
  onClickCheck: (pickup: PickupCoffeeModel) => Promise<void>
  onClickUncheck: (pickup: PickupCoffeeModel) => Promise<void>
  variant?: 'completed' | 'pending'
}
export default function PickupTableView({
  data,
  isLoading,
  totalPickups,
  onClickUpdate,
  onClickCheck,
  onClickUncheck,
  variant = 'pending',
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
        totalLength: totalPickups,
      }}
      table={{
        'data-cy': 'pickupCoffee-table',
      }}
    >
      {data?.map((pickup, index) => (
        <PickupTableRow
          key={index}
          pickup={pickup}
          onClickUpdate={onClickUpdate}
          onClickCheck={onClickCheck}
          onClickUncheck={onClickUncheck}
          variant={variant}
        />
      ))}
    </Table>
  )
}

const headerColumns: TableHeaderColumns[] = [
  { id: 'clientCode', label: 'Código', isSortable: true },
  { id: 'clientName', label: 'Nome do cliente', isSortable: true },
  { id: 'bags', label: 'Sacos', isSortable: true, textAlign: 'center' },
  { id: 'brook', label: 'Córrego', isSortable: true },
  { id: 'complement', label: 'Referência' },
  { id: 'actions', label: 'Ações', align: 'center' },
]
