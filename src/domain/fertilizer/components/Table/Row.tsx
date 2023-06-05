import { Td, Tr } from '@chakra-ui/react'
import { type FertilizerModel } from '../../types/model/Fertilizer'

type Props = {
  fertilizer: FertilizerModel
}
const FertilizerTableRow = ({ fertilizer }: Props): JSX.Element => {
  return (
    <Tr>
      <Td data-cy='table-cell-client-avatar'>{fertilizer.name}</Td>
      <Td>{fertilizer.description ?? '--'}</Td>
    </Tr>
  )
}
export default FertilizerTableRow
