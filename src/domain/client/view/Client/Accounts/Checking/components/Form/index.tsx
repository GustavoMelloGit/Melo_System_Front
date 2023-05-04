import { Button, FormControl, FormLabel, Grid, GridItem, Switch, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import RHFDateInput from '../../../../../../../../shared/components/inputs/RHFDateInput'
import RHFTextField from '../../../../../../../../shared/components/inputs/RHFTextField'
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
  const [isDebit, setIsDebit] = useState(true)
  const {
    handleSubmit,
    register,
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
            <FormControl>
              <FormLabel htmlFor='isDebit'>Débito?</FormLabel>
              <Switch
                id='isDebit'
                isChecked={isDebit}
                onChange={() => {
                  setIsDebit((prev) => !prev)
                }}
              />
            </FormControl>
          </GridItem>
          <GridItem>
            <RHFDateInput<CheckingAccountFormValues> name='date' label='Data' control={control} />
          </GridItem>
          <GridItem>
            <RHFCurrencyInput<CheckingAccountFormValues>
              name='value'
              label='Valor'
              control={control}
              errors={errors}
              leftIcon='R$'
              inputGroupProps={{
                color: isDebit ? 'red.400' : 'green.500',
              }}
            />
          </GridItem>
          <GridItem colSpan={[1, 2]}>
            <RHFTextField<CheckingAccountFormValues>
              name='description'
              label='Descrição'
              register={register}
              errors={errors}
            />
          </GridItem>
        </Grid>
        <Button colorScheme='green' isLoading={isSubmitting} type='submit'>
          {submitText}
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
