import {
  Box,
  Button,
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
import { toast } from 'react-hot-toast'
import { shallow } from 'zustand/shallow'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import { dateToFormat, formatCurrency } from '../../../../../../../../lib/utils/formatters'
import {
  calculateCompoundInterest,
  convertMonthlyInterestRateToDaily,
} from '../../../../../../../../lib/utils/math'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import { createTransactionService } from '../../../../../../service'
import { type CheckingAccountFormValues } from '../../../../../../types/model/CheckingAccount'
import { CheckingAccountEmitter } from '../../events/CheckingAccountEmitter'
import { useFeeStore } from '../../stores/useFeeStore'
import FeeModalForm, { initialValues } from './Form'

function calculateInterest(
  date: number,
  amount: number,
  interestRate: number,
  targetDate: number,
): number {
  const days = Math.floor((targetDate - date) / (1000 * 3600 * 24))
  const dailyInterestRate = convertMonthlyInterestRateToDaily(interestRate)
  return calculateCompoundInterest(days, amount, dailyInterestRate)
}

type Props = {
  clientId: string
}
export default function FeeModal({ clientId }: Props): JSX.Element {
  const [interestParams, setInterestParams] = useState({
    ...initialValues,
    date: dateInputToApiDate(initialValues.date),
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

  async function handleCreateTransaction(values: CheckingAccountFormValues): Promise<void> {
    const { error } = await createTransactionService(values, clientId)
    if (error) {
      toast.error(error)
      return
    }
    toast.success('Lançamento criado com sucesso!')
    CheckingAccountEmitter.emit('transactionCreated', values)
    handleCloseModal()
  }

  let totalWithoutInterest = 0
  let totalAmountWithInterest = 0
  let totalOfInterest = 0
  const interestByIndex = selectedTransactions.map((transaction) => {
    const interest = calculateInterest(
      transaction.date,
      transaction.amount,
      interestParams.interestRate,
      new Date(interestParams.date).getTime(),
    )
    totalWithoutInterest = Math.floor(transaction.amount + totalWithoutInterest)
    totalAmountWithInterest = Math.floor(interest + totalAmountWithInterest)
    totalOfInterest = Math.floor(interest - transaction.amount + totalOfInterest)
    return interest
  })
  const valueToTransactionBeCreated = totalOfInterest

  return (
    <Modal isOpen isCentered onClose={handleCloseModal} size='xl'>
      <ModalOverlay />
      <ModalContent maxW={800}>
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
                      <Th>Juros</Th>
                      <Th>Total</Th>
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
                          {formatCurrency(interestByIndex[index] - transaction.amount)}
                        </Td>
                        <Td color={getColorByValue(interestByIndex[index])}>
                          {formatCurrency(interestByIndex[index])}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr fontWeight={700}>
                      <Th fontSize='md'>Total</Th>
                      <Th fontSize='md' color={getColorByValue(totalWithoutInterest)}>
                        {formatCurrency(totalWithoutInterest)}
                      </Th>
                      <Th fontSize='md' color={getColorByValue(totalOfInterest)}>
                        {formatCurrency(totalOfInterest)}
                      </Th>
                      <Th fontSize='md' color={getColorByValue(totalAmountWithInterest)}>
                        {formatCurrency(totalAmountWithInterest)}
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </Box>
            <Button
              colorScheme={totalAmountWithInterest > 0 ? 'green' : 'red'}
              onClick={async () => {
                await handleCreateTransaction({
                  date: new Date().toISOString(),
                  description: 'ACERTO DE JUROS',
                  value: valueToTransactionBeCreated,
                })
              }}
            >
              {totalAmountWithInterest > 0 ? 'Creditar' : 'Debitar'}{' '}
              {formatCurrency(Math.abs(valueToTransactionBeCreated))}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
