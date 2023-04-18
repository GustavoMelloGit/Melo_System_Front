import { Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import {
  Controller,
  useWatch,
  type Control,
  type Path,
  type UseFormRegister,
} from 'react-hook-form'
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
  isDisabled: (fieldName: Path<SheetFormValues>) => boolean
}
export default function SheetFormSheetDetails({
  register,
  errors,
  control,
  isDisabled,
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
                  label: `${
                    client.nickname ? `${client.name} (${client.nickname})` : `${client.name}`
                  }`,
                  value: client.id,
                }))}
                isLoading={isLoading}
                handleChange={onChange}
                isDisabled={isDisabled('clientId')}
                placeholder='Ex.: João da Silva'
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
            isDisabled={isDisabled('number')}
          />
        </GridItem>
        <GridItem>
          <RHFDateInput<SheetFormValues>
            name='weighingDate'
            control={control}
            label='Data da pesagem'
            type='date'
            isDisabled={isDisabled('weighingDate')}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='courier'
            register={register}
            label='Nome do motorista'
            placeholder='Ex.: João da Silva'
            errors={errors}
            isDisabled={isDisabled('courier')}
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
            isDisabled={isDisabled('weightPerBag')}
          />
        </GridItem>
      </Grid>
    </Stack>
  )
}
