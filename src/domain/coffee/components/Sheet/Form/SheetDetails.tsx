import { Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { Controller, useWatch, type Control, type UseFormRegister } from 'react-hook-form'
import AutocompleteInput from '../../../../../shared/components/inputs/Autocomplete'
import RHFDateInput from '../../../../../shared/components/inputs/RHFDateInput'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import useDebounce from '../../../../../shared/hooks/useDebounce'
import { getClientsService } from '../../../../client/service'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  register: UseFormRegister<SheetFormValues>
  control: Control<SheetFormValues>
  errors: unknown
  variant: 'create' | 'edit'
}
export default function SheetFormSheetDetails({
  register,
  errors,
  control,
  variant,
}: Props): JSX.Element {
  const clientName = useWatch({
    control,
    name: 'clientId',
  })
  const debouncedClientName = useDebounce(clientName, 250)
  const { data: clients, isLoading } = getClientsService(
    debouncedClientName ? `name=${debouncedClientName}` : '',
    {
      revalidateOnFocus: false,
    },
  )

  return (
    <Stack spacing={4}>
      <Heading as='h2' size='lg'>
        Detalhes da folha
      </Heading>
      <Divider />
      <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4} mb={4}>
        <GridItem>
          <Controller
            name='clientId'
            control={control}
            render={({ field: { onChange, ...field } }) => (
              <AutocompleteInput
                label='Cliente'
                options={clients?.map((client) => ({
                  label: `${client.name} ${client.nickname ? `(${client.nickname})` : ''}`,
                  value: client.id,
                }))}
                isLoading={isLoading}
                handleChange={onChange}
                isDisabled={variant === 'edit'}
                {...field}
              />
            )}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='number'
            register={register}
            label='Número da folha'
            placeholder='Ex.: 12'
            type='number'
            inputMode='numeric'
            errors={errors}
          />
        </GridItem>
        <GridItem>
          <RHFDateInput<SheetFormValues>
            name='weighingDate'
            control={control}
            label='Data da pesagem'
            type='date'
            inputMode='numeric'
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='courier'
            register={register}
            label='Nome do motorista'
            placeholder='Ex.: João da Silva'
            errors={errors}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='weightPerBag'
            register={register}
            label='Kg por saca'
            placeholder='Ex.: 61'
            type='number'
            errors={errors}
          />
        </GridItem>
      </Grid>
    </Stack>
  )
}
