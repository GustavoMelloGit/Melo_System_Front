import { Button, Flex, Stack, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../lib/errors'
import ControllerField from '../../../../shared/components/inputs/ControllerField'
import { type FertilizerFormValues } from '../../types/model/Fertilizer'

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
  initialValues: FertilizerFormValues
  onSubmit: (values: FertilizerFormValues) => Promise<void>
}
export default function FertilizerForm({ initialValues, onSubmit }: Props): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FertilizerFormValues>({
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
            placeholder='Insira o nome'
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
          CustomInput={<Textarea placeholder='Insira a descrição' />}
        />
      </Stack>
      <Button mt={5} isLoading={isSubmitting} type='submit' colorScheme='blue' w='full'>
        Salvar
      </Button>
    </form>
  )
}
