import {
  Badge,
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { MdHistory } from 'react-icons/md'
import * as yup from 'yup'
import { shallow } from 'zustand/shallow'
import {
  type InterestCalculation,
  type InterestCalculatorFormValues,
  useInterestCalculatorStore,
} from '../../../lib/stores/InterestCalculatorStore'
import { useModal } from '../../hooks/useModal'
import ControllerField from '../inputs/ControllerField'
import RHFCurrencyInput from '../inputs/RHFCurrencyInput'
import Modal from '../Modal'
import InterestCalculatorHistoryDrawer from './HistoryDrawer'
import InterestCalculatorResultTable from './ResultTable'
import { calculateInterest, getEmptyFormValues } from './utils'

const validationSchema = yup.object().shape({
  capital: yup
    .number()
    .typeError('Informe o valor')
    .moreThan(0, 'Informe o valor')
    .required('Informe o valor'),
  interestRate: yup
    .number()
    .typeError('Informe a taxa de juros')
    .min(0, 'Taxa inválida')
    .required('Informe a taxa de juros'),
  startDate: yup.string().required('Informe a data inicial'),
  endDate: yup
    .string()
    .required('Informe a data final')
    .test(
      'is-after-start',
      'A data final deve ser igual ou posterior à data inicial',
      (endDate, context) =>
        !endDate || !context.parent.startDate || endDate >= context.parent.startDate,
    ),
})

export default function InterestCalculator(): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  const history = useDisclosure()
  const [values, result, historyLength, saveCalculation, restoreCalculation, clear] =
    useInterestCalculatorStore(
      (state) => [
        state.values,
        state.result,
        state.history.length,
        state.saveCalculation,
        state.restoreCalculation,
        state.clear,
      ],
      shallow,
    )

  const { control, handleSubmit, reset } = useForm<InterestCalculatorFormValues>({
    defaultValues: values ?? getEmptyFormValues(),
    resolver: yupResolver(validationSchema),
  })

  function handleCalculate(formValues: InterestCalculatorFormValues): void {
    saveCalculation(calculateInterest(formValues))
  }

  function handleClear(): void {
    clear()
    reset(getEmptyFormValues())
  }

  function handleSelectFromHistory(calculation: InterestCalculation): void {
    restoreCalculation(calculation)
    reset({
      capital: calculation.capital,
      interestRate: calculation.interestRate,
      startDate: calculation.startDate,
      endDate: calculation.endDate,
    })
    history.onClose()
  }

  return (
    <Modal isOpen onClose={closeModal} size='xl'>
      <Modal.Content maxW={800} data-cy='interest-calculator-modal'>
        <Modal.CloseButton />
        <Modal.Header>
          <Flex align='center' gap={3} wrap='wrap' pr={8}>
            <Heading fontSize='3xl'>Calculadora de Juros</Heading>
            <Button
              size='sm'
              variant='outline'
              leftIcon={<MdHistory size={18} />}
              onClick={history.onOpen}
              ml='auto'
            >
              Histórico
              {historyLength > 0 && (
                <Badge ml={2} colorScheme='blue' rounded='full'>
                  {historyLength}
                </Badge>
              )}
            </Button>
          </Flex>
        </Modal.Header>
        <Modal.Body pb={6}>
          <form onSubmit={handleSubmit(handleCalculate)} autoComplete='off'>
            <Stack spacing={4}>
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={3}>
                <RHFCurrencyInput
                  control={control}
                  name='capital'
                  label='Valor capital'
                  leftIcon='R$'
                  isRequired
                />
                <RHFCurrencyInput
                  control={control}
                  name='interestRate'
                  label='Taxa de juros (ao mês)'
                  leftIcon='%'
                  isRequired
                />
                <ControllerField
                  control={control}
                  name='startDate'
                  type='date'
                  label='Data inicial'
                  required
                />
                <ControllerField
                  control={control}
                  name='endDate'
                  type='date'
                  label='Data final'
                  required
                />
              </SimpleGrid>
              <Stack spacing={2}>
                <Button type='submit' colorScheme='blue'>
                  Calcular
                </Button>
                <Button variant='outline' onClick={handleClear}>
                  Limpar
                </Button>
              </Stack>
              <Collapse in={Boolean(result)} animateOpacity>
                {result && <InterestCalculatorResultTable result={result} />}
              </Collapse>
            </Stack>
          </form>
        </Modal.Body>
      </Modal.Content>
      <InterestCalculatorHistoryDrawer
        isOpen={history.isOpen}
        onClose={history.onClose}
        onSelect={handleSelectFromHistory}
      />
    </Modal>
  )
}
