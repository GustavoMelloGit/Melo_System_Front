import { Box, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, type Control } from 'react-hook-form'
import AutocompleteInput from '../../../../../../shared/components/inputs/Autocomplete'
import { getClientsService } from '../../../../service'
import TransferReferralTransferTypeFields from './TransferReferralTransferTypeFields'
import { type ClientTransferFormValues, type Referral } from './types'

type Props = {
  control: Control<ClientTransferFormValues, any>
  referral: Referral
}
export default function TransferReferral({ control, referral }: Props): JSX.Element {
  const [clientName, setClientName] = useState<string>('')
  const { data: clients, isLoading: isLoadingClients } = getClientsService(`name=${clientName}`)

  return (
    <Box
      as='fieldset'
      minW={{
        base: '100%',
        md: 415,
      }}
      flex={1}
      border='1px solid #E2E8F0'
      rounded={10}
      p={4}
      pb={6}
      bg='rgba(255, 255, 255, 0.02)'
    >
      <Text as='legend' fontSize='lg' fontWeight='bold' px={2}>
        {referral === 'from' ? 'Transferir de' : 'Transferir para'}
      </Text>
      <Stack spacing={2}>
        <Controller
          name={`${referral}.clientId`}
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <AutocompleteInput
              label='Cliente'
              options={clients?.data?.map((client) => ({
                label: `${client.name} ${client.nickname ? `(${client.nickname})` : ''}`,
                value: client.id,
              }))}
              isLoading={isLoadingClients}
              handleChange={(value) => {
                onChange(value)
                setClientName(value)
              }}
              placeholder='Nome do cliente'
              isRequired
              {...field}
            />
          )}
        />
        <TransferReferralTransferTypeFields referral={referral} />
      </Stack>
    </Box>
  )
}
