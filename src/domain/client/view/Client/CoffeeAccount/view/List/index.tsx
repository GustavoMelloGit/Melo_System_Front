import { Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import RHFField from '../../../../../../../shared/components/inputs/RHFField'
import CoffeeAccountTable from '../../components/List'
import { INITIAL_KG_PER_BAG } from '../../constants'
import useCoffeeAccountView from './useView'

export default function CoffeeAccountView(): JSX.Element {
  const { data, isLoading, total, handleSubmitKgPerBag } = useCoffeeAccountView()
  const { register, handleSubmit } = useForm<{ kgPerBag: number }>({
    defaultValues: {
      kgPerBag: INITIAL_KG_PER_BAG,
    },
  })

  return (
    <Stack spacing={4}>
      <form
        onSubmit={handleSubmit((values) => {
          handleSubmitKgPerBag(values.kgPerBag)
        })}
      >
        <RHFField
          name='kgPerBag'
          register={register}
          label='Kg por saca'
          type='number'
          inputMode='numeric'
          min={0}
          step={0.1}
        />
      </form>
      <CoffeeAccountTable data={data} isLoading={isLoading} totalLength={total} />
    </Stack>
  )
}
