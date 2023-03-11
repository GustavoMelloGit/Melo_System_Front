import { Td, Tr } from '@chakra-ui/react'
import TableCheckButton from '../../../../../shared/components/table/buttons/Check'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import { type PickupCoffeeModel } from '../../../types/model/pickup'

type Props = {
  pickup: PickupCoffeeModel
  onClickUpdate: (pickup: PickupCoffeeModel) => Promise<void>
  onClickCheck: (pickup: PickupCoffeeModel) => Promise<void>
}
export default function PickupTableRow({
  pickup,
  onClickUpdate,
  onClickCheck,
}: Props): JSX.Element {
  return (
    <Tr>
      <Td data-cy='pickupCoffee-table-clientName'>{pickup.clientName}</Td>
      <Td data-cy='pickupCoffee-table-bags'>{pickup.bags}</Td>
      <Td data-cy='pickupCoffee-table-address'>{pickup.address}</Td>
      <Td textAlign='center'>
        <TableEditButton
          aria-label='Editar pedido de coleta'
          title='Editar pedido de coleta'
          colorScheme='blue'
          onClick={() => {
            void onClickUpdate(pickup)
          }}
          data-cy='pickupCoffee-edit'
        />
        <TableCheckButton
          aria-label='Finalizar pedido de coleta'
          title='Finalizar pedido de coleta'
          colorScheme='green'
          onClick={() => {
            void onClickCheck(pickup)
          }}
          data-cy='pickupCoffee-check'
        />
      </Td>
    </Tr>
  )
}
