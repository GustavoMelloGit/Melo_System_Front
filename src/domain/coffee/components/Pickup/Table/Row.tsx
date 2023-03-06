import { Button, Td, Tr } from '@chakra-ui/react'
import { type PickupCoffee } from '../../../types/pickup'

type Props = {
  pickup: PickupCoffee
}
export default function PickupTableRow({ pickup }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{pickup.clientName}</Td>
      <Td>{pickup.bags}</Td>
      <Td>{pickup.address}</Td>
      <Td>
        <Button>a</Button>
      </Td>
    </Tr>
  )
}
