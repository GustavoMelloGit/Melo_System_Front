import {
  Button,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Textarea,
  VStack,
  type TextareaProps,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import { type CheckingAccountFormValues } from '../../../../../../types/model/CheckingAccount'

type CheckingAccountFormProps = {
  onSubmit: (values: CheckingAccountFormValues) => Promise<void>
  initialValues?: CheckingAccountFormValues
  submitText: string
}
export default function CheckingAccountForm({
  onSubmit,
  initialValues,
  submitText,
}: CheckingAccountFormProps): JSX.Element {
  const [isDebit, setIsDebit] = useState<boolean>(true)
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<CheckingAccountFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(async ({ value, ...values }) => {
        const valueInCents = value * 100
        const convertedValue = isDebit ? -valueInCents : valueInCents
        await onSubmit({ ...values, value: convertedValue })
      })}
    >
      <VStack align='stretch' gap={4}>
        <Grid gridTemplateColumns={['1fr', 'repeat(2, 1fr)']} gap={3}>
          <GridItem colSpan={[1, 2]}>
            <RadioGroup
              value={isDebit ? 'true' : 'false'}
              onChange={(value) => {
                setIsDebit(value === 'true')
              }}
              display='flex'
              gap={4}
              mb={1}
            >
              <Radio value='true'>Débito</Radio>
              <Radio value='false'>Crédito</Radio>
            </RadioGroup>
          </GridItem>
          <GridItem>
            <ControllerField<CheckingAccountFormValues>
              name='date'
              label='Data'
              type='date'
              control={control}
              required
            />
          </GridItem>
          <GridItem>
            <RHFCurrencyInput<CheckingAccountFormValues>
              name='value'
              label='Valor'
              control={control}
              errors={errors}
              leftIcon='R$'
              isRequired
              color={isDebit ? 'red.400' : 'green.500'}
            />
          </GridItem>

          <GridItem colSpan={[1, 2]}>
            <ControllerField<CheckingAccountFormValues, TextareaProps>
              name='description'
              label='Descrição'
              control={control}
              CustomInput={<Textarea />}
              required
            />
          </GridItem>
        </Grid>
        <Button
          w='full'
          type='submit'
          colorScheme={isDebit ? 'red' : 'green'}
          isLoading={isSubmitting}
        >
          {isDebit ? 'Debitar' : 'Creditar'}
        </Button>
      </VStack>
    </form>
  )
}

const validationSchema = yup.object().shape({
  date: yup.string().required(validationErrors.dateIsRequired),
  value: yup.string().required(validationErrors.valueIsRequired),
  description: yup
    .string()
    .required(validationErrors.descriptionIsRequired)
    .max(255, 'Máximo de 255 caracteres'),
})
