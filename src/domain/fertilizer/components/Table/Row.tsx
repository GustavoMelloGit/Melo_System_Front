import { Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import { type FertilizerModel } from '../../types/model/Fertilizer'

type Props = {
  fertilizer: FertilizerModel
}
const FertilizerTableRow = ({ fertilizer }: Props): JSX.Element => {
  return (
    <Tr>
      <Td data-cy='table-cell-fertilizer-createdAt'>
        {format(fertilizer.createdAt, 'dd/MM/yyyy')}
      </Td>
      <Td data-cy='table-cell-fertilizer-name'>{fertilizer.name}</Td>
      <Td>{fertilizer.description ?? '--'}</Td>
    </Tr>
  )
}
export default FertilizerTableRow
