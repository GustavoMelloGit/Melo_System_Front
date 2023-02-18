import {
  Divider,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { formatCurrency, formatDate } from '../../../../../../../../lib/utils/formatters'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import CurrencyInput from '../../../../../../../../shared/components/inputs/CurrencyInput'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { useFeeStore, type TransactionSelected } from '../../stores/useFeeStore'

export default function FeeModal(): JSX.Element {
  const [interestRate, setInterestRate] = useState(3)
  const closeModal = useModal((state) => state.closeModal)
  const [selectedTransactions, setSelectedFees] = useFeeStore((state) => [
    state.selectedTransactions,
    state.setSelectedTransactions,
  ])

  function handleCloseModal(): void {
    setSelectedFees([])
    closeModal()
  }

  function calculateMonthlyCompoundInterest(date: string, amount: number): number {
    if (!interestRate) return 0
    const month = date.split('-')[1]
    const year = date.split('-')[0]
    const today = new Date()
    const todayMonth = today.getMonth() + 1
    const todayYear = today.getFullYear()
    const months = (todayYear - Number(year)) * 12 + (todayMonth - Number(month))
    return amount * (1 + interestRate / 100) ** months
  }
  const interestByIndex = selectedTransactions.map((transaction) => {
    return calculateMonthlyCompoundInterest(transaction.date, transaction.amount)
  })

  const totalAmountWithInterest = interestByIndex.reduce((acc, curr) => acc + curr, 0)

  return (
    <Modal isOpen isCentered onClose={handleCloseModal} size='xl'>
      <ModalOverlay />
      <ModalContent py={4}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading fontSize='3xl'>Calcular juros</Heading>
        </ModalHeader>
        <ModalBody>
          <VStack align='stretch' spacing={4}>
            <CurrencyInput
              leftIcon='%'
              label='Taxa de juros'
              setValue={setInterestRate}
              value={interestRate}
            />
            <TableContainer
              sx={{
                '& td': {
                  borderTop: '1px solid white',
                  borderBottom: 'none',
                },
              }}
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>Data</Th>
                    <Th>Valor</Th>
                    <Th>Juros</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {selectedTransactions.map((transaction, index) => (
                    <Tr key={transaction.id}>
                      <FeeArea transaction={transaction} fee={interestByIndex[index]} />
                      <GridItem colSpan={3}>
                        <Divider />
                      </GridItem>
                    </Tr>
                  ))}
                  <Tr>
                    <Td colSpan={2} fontWeight={600}>
                      Total
                    </Td>
                    <Td fontWeight={700} color={getColorByValue(totalAmountWithInterest)}>
                      {formatCurrency(totalAmountWithInterest)}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

type FeeAreaProps = {
  transaction: TransactionSelected
  fee: number
}
function FeeArea({ fee, transaction }: FeeAreaProps): JSX.Element {
  return (
    <>
      <Td>{formatDate(transaction.date)}</Td>
      <Td color={getColorByValue(transaction.amount)}>{formatCurrency(transaction.amount)}</Td>
      <Td color={getColorByValue(fee)}>{formatCurrency(fee)}</Td>
    </>
  )
}
