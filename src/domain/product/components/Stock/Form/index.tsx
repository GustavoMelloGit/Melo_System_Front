import { Button, Flex, Stack, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../shared/components/inputs/RHFCurrencyInput'
import { type StockProductFormValues } from './types'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(validationErrors.nameIsRequired)
    .typeError(validationErrors.nameIsRequired),
  quantity: yup
    .number()
    .required(validationErrors.quantityIsRequired)
    .typeError(validationErrors.quantityIsRequired),
  description: yup.string(),
  cost: yup
    .number()
    .required(validationErrors.costIsRequired)
    .typeError(validationErrors.costIsInvalid),
  sale: yup
    .number()
    .required(validationErrors.saleIsRequired)
    .typeError(validationErrors.saleIsInvalid),
})

type Props = {
  initialValues: StockProductFormValues
  onSubmit: (values: StockProductFormValues) => Promise<void>
  submitButtonLabel: string
}
export default function StockProductForm({
  initialValues,
  onSubmit,
  submitButtonLabel,
}: Props): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StockProductFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  return (
    <form
      onSubmit={handleSubmit(async (values) =>
        onSubmit({
          ...values,
          quantity: Number(values.quantity),
          cost: values.cost * 100,
          sale: values.sale * 100,
        }),
      )}
    >
      <Stack spacing={3}>
        <Flex gap={3}>
          <ControllerField
            control={control}
            name='name'
            label='Nome'
            required
            placeholder='Nome do produto'
          />
          <ControllerField
            control={control}
            name='quantity'
            label='Quantidade'
            required
            placeholder='Insira a quantidade'
            type='number'
            inputMode='numeric'
          />
        </Flex>
        <Flex gap={3}>
          <RHFCurrencyInput
            name={'cost'}
            label='Preço de custo'
            control={control}
            leftIcon='R$'
            isRequired
          />
          <RHFCurrencyInput
            name={'sale'}
            label='Preço de venda'
            control={control}
            leftIcon='R$'
            isRequired
          />
        </Flex>
        <ControllerField
          control={control}
          name='description'
          label='Descrição'
          CustomInput={<Textarea placeholder='Descrição do produto' />}
        />
      </Stack>
      <Button mt={5} isLoading={isSubmitting} type='submit' colorScheme='blue' w='full'>
        {submitButtonLabel}
      </Button>
    </form>
  )
}
