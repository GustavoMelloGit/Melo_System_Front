import { Button, Flex, Stack, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
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
})

type Props = {
  initialValues: StockProductFormValues
  onSubmit: (values: StockProductFormValues) => Promise<void>
}
export default function StockProductForm({ initialValues, onSubmit }: Props): JSX.Element {
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
        <ControllerField
          control={control}
          name='description'
          label='Descrição'
          CustomInput={<Textarea placeholder='Descrição do produto' />}
        />
      </Stack>
      <Button mt={5} isLoading={isSubmitting} type='submit' colorScheme='blue' w='full'>
        Adicionar
      </Button>
    </form>
  )
}
