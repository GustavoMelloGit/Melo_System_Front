import { Divider, Grid, GridItem, Heading, Stack } from '@chakra-ui/react'
import { useWatch, type Control, type UseFormRegister } from 'react-hook-form'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import SpinLoader from '../../../../../shared/components/SpinLoader'
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
          <RHFField<SheetFormValues>
            name='clientId'
            label='ID do Cliente'
            register={register}
            list='client-list'
            placeholder='Nome do cliente'
            errors={errors}
            data-cy='clientName-input'
            isDisabled={variant === 'edit'}
            {...(isLoading && {
              rightIcon: <SpinLoader />,
            })}
          />
          {clients?.length !== 0 && (
            <datalist id='client-list'>
              {clients?.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} {client.nickname && `(${client.nickname})`}
                </option>
              ))}
            </datalist>
          )}
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
            isDisabled={variant === 'edit'}
          />
        </GridItem>
        <GridItem>
          <RHFField<SheetFormValues>
            name='weighingDate'
            register={register}
            label='Data da pesagem'
            type='date'
            inputMode='numeric'
            errors={errors}
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
      </Grid>
    </Stack>
  )
}
