import { HStack, Td, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import TableLinkToButton from '../../../../../shared/components/table/buttons/LinkTo'
import { type BookModel } from '../../../types/model/book'

export type Props = {
  book: BookModel
}
export default function BookTableRow({ book }: Props): JSX.Element {
  return (
    <Tr>
      <Td data-cy='table-cell-client-avatar'>{book.number}</Td>
      <Td>{dateToFormat(book.createdAt, 'dd/MM/yyyy')}</Td>
      <Td textAlign='center' data-cy='table-cell-client-actions'>
        <HStack w='full' justify='center'>
          <Link to={Routes.bookPage(book.number)}>
            <TableLinkToButton aria-label='detalhes to talão' />
          </Link>
        </HStack>
      </Td>
    </Tr>
  )
}
