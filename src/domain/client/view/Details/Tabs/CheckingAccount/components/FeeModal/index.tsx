import {
  Box,
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
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { formatCurrency } from '../../../../../../../../lib/utils/formatters'
import { calculateMonthlyCompoundInterest } from '../../../../../../../../lib/utils/math'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import CurrencyInput from '../../../../../../../../shared/components/inputs/CurrencyInput'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { useFeeStore } from '../../stores/useFeeStore'

function calculateInterest(date: string, amount: number, interestRate: number): number {
  const month = date.split('-')[1]
  const year = date.split('-')[0]
  const today = new Date()
  const todayMonth = today.getMonth() + 1
  const todayYear = today.getFullYear()
  const months = (todayYear - Number(year)) * 12 + (todayMonth - Number(month))
  return calculateMonthlyCompoundInterest(months, amount, interestRate)
}

export default function FeeModal(): JSX.Element {
  const [interestRate, setInterestRate] = useState(3)
  const closeModal = useModal((state) => state.closeModal)
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const [selectedTransactions, setSelectedFees] = useFeeStore((state) => [
    state.selectedTransactions,
    state.setSelectedTransactions,
  ])

  function handleCloseModal(): void {
    setSelectedFees([])
    closeModal()
  }

  let totalWithouInterest = 0
  let totalAmountWithInterest = 0
  const interestByIndex = useMemo(
    () =>
      selectedTransactions.map((transaction) => {
        const interest = calculateInterest(transaction.date, transaction.amount, interestRate)
        totalWithouInterest += transaction.amount
        totalAmountWithInterest += interest
        return interest
      }),
    [interestRate, selectedTransactions],
  )

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

            <Box maxH={[300, 400]} overflowY='auto'>
              <TableContainer
                sx={{
                  '& td': {
                    borderBottom: '1px solid',
                    borderColor,
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
                        <Td>{format(new Date(transaction.date), 'dd/MM/yyyy')}</Td>
                        <Td color={getColorByValue(transaction.amount)}>
                          {formatCurrency(transaction.amount)}
                        </Td>
                        <Td color={getColorByValue(interestByIndex[index])}>
                          {formatCurrency(interestByIndex[index])}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th fontSize='md' fontWeight={600}>
                        Total
                      </Th>
                      <Th
                        fontSize='md'
                        fontWeight={700}
                        color={getColorByValue(totalWithouInterest)}
                      >
                        {formatCurrency(totalWithouInterest)}
                      </Th>
                      <Th
                        fontSize='md'
                        fontWeight={700}
                        color={getColorByValue(totalAmountWithInterest)}
                      >
                        {formatCurrency(totalAmountWithInterest)}
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
