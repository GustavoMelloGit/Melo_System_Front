import { Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { Controller, useWatch, type Control, type Path } from 'react-hook-form'
import AutocompleteInput from '../../../../../shared/components/inputs/Autocomplete'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import useDebounce from '../../../../../shared/hooks/useDebounce'
import { getClientsService } from '../../../../client/service'
import { type SheetFormValues } from '../../../types/model/sheet'

type Props = {
  control: Control<SheetFormValues>
  isDisabled: (fieldName: Path<SheetFormValues>) => boolean
}
export default function SheetFormSheetDetails({ control, isDisabled }: Props): JSX.Element {
  const clientName = useWatch({
    control,
    name: 'clientId',
  })
  const debouncedClientName = useDebounce(clientName, 250)
  const { data, isLoading } = getClientsService(
    debouncedClientName ? `searchableName=${debouncedClientName}&limit=10` : '',
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
                options={data?.data.map((client) => ({
                  label: `${
                    client.nickname ? `${client.name} (${client.nickname})` : `${client.name}`
                  }`,
                  value: client.id,
                }))}
                isLoading={isLoading}
                handleChange={onChange}
                isRequired
                isDisabled={isDisabled('clientId')}
                placeholder='Ex.: João da Silva'
                {...field}
              />
            )}
          />
        </GridItem>
        <GridItem>
          <ControllerField<SheetFormValues>
            control={control}
            name='number'
            label='Número da folha'
            placeholder='Ex.: 12'
            type='number'
            inputMode='numeric'
            required
            isDisabled={isDisabled('number')}
          />
        </GridItem>
        <GridItem>
          <ControllerField<SheetFormValues>
            name='weighingDate'
            label='Data da pesagem'
            type='date'
            control={control}
            required
            isDisabled={isDisabled('weighingDate')}
          />
        </GridItem>
        <GridItem>
          <ControllerField<SheetFormValues>
            control={control}
            name='courier'
            label='Nome do motorista'
            placeholder='Ex.: João da Silva'
            required
            isDisabled={isDisabled('courier')}
          />
        </GridItem>
      </Grid>
    </Stack>
  )
}
