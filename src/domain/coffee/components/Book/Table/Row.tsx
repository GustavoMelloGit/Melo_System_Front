import { HStack, LinkBox, LinkOverlay, Td, Tr } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import IconButton from '../../../../../shared/components/IconButton'
import { type BookModel } from '../../../types/model/book'

export type Props = {
  book: BookModel
}
export default function BookTableRow({ book }: Props): JSX.Element {
  return (
    <LinkBox as={Tr}>
      <Td data-cy='table-cell-client-avatar'>{book.number}</Td>
      <Td>{dateToFormat(book.createdAt, 'dd/MM/yyyy')}</Td>
      <Td textAlign='center' data-cy='table-cell-client-actions'>
        <HStack w='full' justify='center'>
          <LinkOverlay as={Link} to={Routes.bookPage(book.number)}>
            <IconButton icon='linkTo' colorScheme='blue' aria-label='detalhes to talão' />
          </LinkOverlay>
        </HStack>
      </Td>
    </LinkBox>
  )
}
