import { Badge, LinkBox, Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import { type SheetModel } from '../../../../coffee/types/model/sheet'

export type Props = {
  sheet: SheetModel
}
export default function ClientSheetsTableRow({ sheet }: Props): JSX.Element {
  return (
    <LinkBox as={Tr} h={61}>
      <Td>{sheet.number}</Td>
      <Td>{sheet.client.name}</Td>
      <Td>{sheet.courier}</Td>
      <Td>{dateToFormat(sheet.weighingDate, 'dd/MM/yyyy')}</Td>
      <Td textAlign='center'>
        <Badge colorScheme={sheet.isDraft ? 'blue' : 'green'}>
          {sheet.isDraft ? 'Rascunho' : 'Creditado'}
        </Badge>
      </Td>
    </LinkBox>
  )
}
