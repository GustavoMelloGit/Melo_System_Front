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
import { useState } from 'react'
import { shallow } from 'zustand/shallow'
import { formatInputDateString } from '../../../../../../../../lib/utils/date'
import { dateToFormat, formatCurrency } from '../../../../../../../../lib/utils/formatters'
import {
  calculateCompoundInterest,
  convertMonthlyInterestRateToDaily,
} from '../../../../../../../../lib/utils/math'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { useFeeStore } from '../../stores/useFeeStore'
import FeeModalForm, { initialValues } from './Form'

function calculateInterest(
  date: number,
  amount: number,
  interestRate: number,
  targetDate?: number,
): number {
  const todayDate = new Date().getTime()
  const days = Math.floor(((targetDate ?? todayDate) - date) / (1000 * 3600 * 24))
  const dailyInterestRate = convertMonthlyInterestRateToDaily(interestRate)
  return calculateCompoundInterest(days, amount, dailyInterestRate)
}

export default function FeeModal(): JSX.Element {
  const [interestParams, setInterestParams] = useState({
    ...initialValues,
    date: formatInputDateString(initialValues.date),
  })
  const closeModal = useModal((state) => state.closeModal)
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const [selectedTransactions, setSelectedFees] = useFeeStore(
    (state) => [state.selectedTransactions, state.setSelectedTransactions],
    shallow,
  )

  function handleCloseModal(): void {
    setSelectedFees([])
    closeModal()
  }

  let totalWithoutInterest = 0
  let totalAmountWithInterest = 0
  const interestByIndex = selectedTransactions.map((transaction) => {
    const interest = calculateInterest(
      transaction.date,
      transaction.amount,
      interestParams.interestRate,
      new Date(interestParams.date).getTime(),
    )
    totalWithoutInterest += transaction.amount
    totalAmountWithInterest += interest
    return interest
  })

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
            <FeeModalForm onSubmit={setInterestParams} />

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
                      <Th>Valor + Juros</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedTransactions.map((transaction, index) => (
                      <Tr key={transaction.id}>
                        <Td>{dateToFormat(transaction.date, 'dd/MM/yyyy')}</Td>
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
                        color={getColorByValue(totalWithoutInterest)}
                      >
                        {formatCurrency(totalWithoutInterest)}
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
