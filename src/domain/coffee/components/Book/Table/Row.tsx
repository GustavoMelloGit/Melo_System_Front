import { HStack, Td } from '@chakra-ui/react'
import { Routes } from '../../../../../lib/routes'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import IconButton from '../../../../../shared/components/IconButton'
import LinkRow from '../../../../../shared/components/table/LinkRow'
import { type BookModel } from '../../../types/model/book'

export type Props = {
  book: BookModel
}
export default function BookTableRow({ book }: Props): JSX.Element {
  return (
    <LinkRow
      to={Routes.bookPage(book.number)}
      descriptiveLinkText={`Ir para o talão ${book.number}`}
    >
      <Td data-cy='table-cell-client-avatar'>{book.number}</Td>
      <Td>{dateToFormat(book.createdAt, 'dd/MM/yyyy')}</Td>
      <Td textAlign='center' data-cy='table-cell-client-actions'>
        <HStack w='full' justify='center'>
          <IconButton icon='linkTo' colorScheme='blue' aria-label='detalhes to talão' />
        </HStack>
      </Td>
    </LinkRow>
  )
}
