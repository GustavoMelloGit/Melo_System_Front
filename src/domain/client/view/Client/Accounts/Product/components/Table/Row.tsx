import { Td, Tr } from '@chakra-ui/react'
import { dateToFormat } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { type ProductTransactionModel } from '../../../../../../types/model/Transaction'
import DownloadSaleButton from '../SaleTemplate/DownloadButton'

type Props = {
  transaction: ProductTransactionModel
}
export default function FertilizerAccountTableRow({ transaction }: Props): JSX.Element {
  return (
    <Tr>
      <Td>{dateToFormat(transaction.date)}</Td>
      <Td>{transaction.description}</Td>
      <Td textAlign='center' display='flex' alignItems='center' gap={2} justifyContent='center'>
        <DownloadSaleButton transaction={transaction} />
        <MoreInfoTooltip
          placement='left'
          label={`${transaction.user.name}, ${dateToFormat(
            transaction.createdAt,
            'dd/MM/yyyy kk:mm',
          )}`}
        />
      </Td>
    </Tr>
  )
}
