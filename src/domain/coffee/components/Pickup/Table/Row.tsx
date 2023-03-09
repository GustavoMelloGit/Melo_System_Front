import { Td, Tr } from '@chakra-ui/react'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import { type PickupCoffee } from '../../../types/model/pickup'

type Props = {
  pickup: PickupCoffee
  onClickUpdate: (pickup: PickupCoffee) => Promise<void>
}
export default function PickupTableRow({ pickup, onClickUpdate }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{pickup.clientName}</Td>
      <Td>{pickup.bags}</Td>
      <Td>{pickup.address}</Td>
      <Td textAlign='center'>
        <TableEditButton
          aria-label='Editar pedido de coleta'
          onClick={() => {
            void onClickUpdate(pickup)
          }}
        />
      </Td>
    </Tr>
  )
}
