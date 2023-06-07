import { Td, Tr } from '@chakra-ui/react'
import { format } from 'date-fns'
import TableButton from '../../../../../shared/components/table/buttons'
import { type FertilizerModel } from '../../../types/model/Fertilizer'

type Props = {
  fertilizer: FertilizerModel
  onClickDelete: (id: string) => Promise<void>
}
const FertilizerTableRow = ({ fertilizer, onClickDelete }: Props): JSX.Element => {
  return (
    <Tr>
      <Td data-cy='table-cell-fertilizer-createdAt'>
        {format(fertilizer.createdAt, 'dd/MM/yyyy')}
      </Td>
      <Td data-cy='table-cell-fertilizer-name'>{fertilizer.name}</Td>
      <Td>{fertilizer.description ?? '--'}</Td>
      <Td textAlign='center'>
        <TableButton
          aria-label='Deletar adubo'
          icon='remove'
          colorScheme='red'
          onClick={async () => onClickDelete(fertilizer.id)}
        />
      </Td>
    </Tr>
  )
}
export default FertilizerTableRow
