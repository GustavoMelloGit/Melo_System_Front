import { Center, HStack, Td, Tr } from '@chakra-ui/react'
import { formatCurrency, formatDate } from '../../../../../../../../lib/utils/formatters'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { type TransactionModel } from '../../../../../../types/model/Transaction'

type TransactionsListRowProps = {
  transaction: TransactionModel
}
export default function TransactionsListRow({
  transaction,
}: TransactionsListRowProps): JSX.Element {
  return (
    <Tr>
      <Td>{formatDate(transaction.date, 'dd/MM/yyyy')}</Td>
      <Td
        title={transaction.description}
        maxW={80}
        whiteSpace='nowrap'
        textOverflow='ellipsis'
        overflow='hidden'
      >
        {transaction.description}
      </Td>
      <Td color={transaction.value >= 0 ? 'green.500' : 'red.400'}>
        {formatCurrency(transaction.value)}
      </Td>
      <Td color={transaction.value >= 0 ? 'green.500' : 'red.400'}>
        {formatCurrency(transaction.clientBalance)}
      </Td>
      <Td>
        <HStack w='full' justify='center'>
          <Center w={10} h={10}>
            <MoreInfoTooltip
              label={`${transaction.user.name}, ${formatDate(
                transaction.createdAt,
                'dd/MM/yyyy HH:mm',
              )}`}
            />
          </Center>
        </HStack>
      </Td>
    </Tr>
  )
}
