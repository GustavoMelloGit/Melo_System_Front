import { Button, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  initialValues?: SheetFormValues
  onSubmit: (values: SheetFormValues) => Promise<void>
}
export default function SheetForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFField<SheetFormValues>
          name='number'
          register={register}
          label='Número da folha'
          placeholder='Ex.: 12'
          type='number'
          inputMode='numeric'
          errors={formState.errors}
        />
        <RHFField<SheetFormValues>
          name='weighingDate'
          register={register}
          label='Data da pesagem'
          type='date'
          inputMode='numeric'
          errors={formState.errors}
        />
        <RHFField<SheetFormValues>
          name='courier'
          register={register}
          label='Nome do motorista'
          placeholder='Ex.: João da Silva'
          errors={formState.errors}
        />
        <Button type='submit' isLoading={formState.isSubmitting}>
          Criar
        </Button>
      </Stack>
    </form>
  )
}
