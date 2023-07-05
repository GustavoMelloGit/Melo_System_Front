import { Flex } from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { formatInputDateString } from '../../../../../../../../lib/utils/date'
import IconButton from '../../../../../../../../shared/components/IconButton'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import CurrencyInput from '../../../../../../../../shared/components/inputs/CurrencyInput'

type FormValues = {
  interestRate: number
  date: string
}

export const initialValues: FormValues = {
  interestRate: 5,
  date: new Date().toISOString().split('T')[0],
}

type Props = {
  onSubmit: (values: FormValues) => void
}
const FeeModalForm = ({ onSubmit }: Props): JSX.Element => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: initialValues,
  })
  function handleCalculateFee({ date, ...values }: FormValues): void {
    onSubmit({ ...values, date: formatInputDateString(date) })
  }
  return (
    <form onSubmit={handleSubmit(handleCalculateFee)}>
      <Flex
        gap={2}
        flexDir={{
          base: 'column',
          sm: 'row',
        }}
      >
        <ControllerField control={control} name='date' type='date' label='Data' />
        <Controller
          control={control}
          name='interestRate'
          render={({ field: { onChange, value, ...rest } }) => (
            <CurrencyInput
              leftIcon='%'
              label='Taxa de juros'
              initialValue={initialValues.interestRate}
              rightIcon={<IconButton icon='fee' aria-label='calcular juros' type='submit' />}
              setValue={onChange}
              {...rest}
            />
          )}
        />
      </Flex>
    </form>
  )
}
export default FeeModalForm
