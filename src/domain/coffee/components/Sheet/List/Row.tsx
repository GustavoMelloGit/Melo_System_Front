import { Td, Tr } from '@chakra-ui/react'
import { formatDate } from '../../../../../lib/utils/formatters'
import { type SheetModel } from '../../../types/model/sheet'

export type Props = {
  sheet: SheetModel
}
export default function SheetsTableRow({ sheet }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{sheet.number}</Td>
      <Td>Nome do cliente</Td>
      <Td>{sheet.courier}</Td>
      <Td>{formatDate(sheet.weighingDate, false)}</Td>
      <Td />
    </Tr>
  )
}
