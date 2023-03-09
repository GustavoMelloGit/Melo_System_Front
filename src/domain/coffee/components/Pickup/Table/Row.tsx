import { Td, Tr } from '@chakra-ui/react'
import TableCheckButton from '../../../../../shared/components/table/buttons/Check'
import TableEditButton from '../../../../../shared/components/table/buttons/Edit'
import { type PickupCoffee } from '../../../types/model/pickup'

type Props = {
  pickup: PickupCoffee
  onClickUpdate: (pickup: PickupCoffee) => Promise<void>
  onClickCheck: (pickup: PickupCoffee) => Promise<void>
}
export default function PickupTableRow({
  pickup,
  onClickUpdate,
  onClickCheck,
}: Props): JSX.Element {
  return (
    <Tr>
      <Td>{pickup.clientName}</Td>
      <Td>{pickup.bags}</Td>
      <Td>{pickup.address}</Td>
      <Td textAlign='center'>
        <TableEditButton
          aria-label='Editar pedido de coleta'
          colorScheme='blue'
          onClick={() => {
            void onClickUpdate(pickup)
          }}
        />
        <TableCheckButton
          aria-label='Finalizar pedido de coleta'
          colorScheme='green'
          onClick={() => {
            void onClickCheck(pickup)
          }}
        />
      </Td>
    </Tr>
  )
}
