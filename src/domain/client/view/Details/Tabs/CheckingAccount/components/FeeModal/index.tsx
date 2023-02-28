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
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { formatCurrency } from '../../../../../../../../lib/utils/formatters'
import { calculateMonthlyCompoundInterest } from '../../../../../../../../lib/utils/math'
import { getColorByValue } from '../../../../../../../../lib/utils/styles'
import CurrencyInput from '../../../../../../../../shared/components/inputs/CurrencyInput'
import TableFeeButton from '../../../../../../../../shared/components/table/buttons/Fee'
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
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      interestRate: DEFAULT_INITIAL_INTEREST,
    },
  })
  const [interestRate, setInterestRate] = useState(DEFAULT_INITIAL_INTEREST)
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
  function handleCalculateFee(values: FormValues): void {
    setInterestRate(values.interestRate)
  }

  let totalWithoutInterest = 0
  let totalAmountWithInterest = 0
  const interestByIndex = selectedTransactions.map((transaction) => {
    const interest = calculateInterest(transaction.date, transaction.amount, interestRate)
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
            <form onSubmit={handleSubmit(handleCalculateFee)}>
              <Controller
                control={control}
                name='interestRate'
                render={({ field: { onChange, value, ...rest } }) => (
                  <CurrencyInput
                    leftIcon='%'
                    label='Taxa de juros'
                    initialValue={3}
                    rightIcon={<TableFeeButton aria-label='calcular juros' type='submit' />}
                    setValue={onChange}
                    {...rest}
                  />
                )}
              />
            </form>

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

const DEFAULT_INITIAL_INTEREST = 3
type FormValues = {
  interestRate: number
}
