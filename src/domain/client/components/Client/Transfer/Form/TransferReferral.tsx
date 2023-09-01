import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { useWatch, type Control } from 'react-hook-form'
import { ClientNameParser } from '../../../../../../lib/utils/clientNameParser'
import { normalize } from '../../../../../../lib/utils/normalize'
import IconButton from '../../../../../../shared/components/IconButton'
import ControllerAutocomplete from '../../../../../../shared/components/inputs/ControllerAutocomplete'
import useDebounce from '../../../../../../shared/hooks/useDebounce'
import { useModal } from '../../../../../../shared/hooks/useModal'
import { getClientsService } from '../../../../service/getClientsService'
import TransferReferralTransferTypeFields from './TransferReferralTransferTypeFields'
import { type ClientTransferFormValues, type Referral } from './types'

type Props = {
  control: Control<ClientTransferFormValues, any>
  referral: Referral
}
export default function TransferReferral({ control, referral }: Props): JSX.Element {
  const clientName = useWatch({
    control,
    name: `${referral}.clientName`,
  })
  const clientId = useWatch({
    control,
    name: `${referral}.clientId`,
  })
  const debouncedClientName = useDebounce(clientName, 300)
  const { data: clients, isLoading: isLoadingClients } = getClientsService(
    `searchableName=${normalize(debouncedClientName)}&limit=10`,
  )
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
        <Flex align='flex-end' gap={3}>
          <ControllerAutocomplete
            control={control}
            name={`${referral}.clientId`}
            auxName={`${referral}.clientName`}
            label='Cliente'
            options={clients?.data?.map((client) => ({
              label: client.nickname
                ? ClientNameParser.addNickname(client.name, client.nickname)
                : client.name,
              value: client.id,
            }))}
            isLoading={isLoadingClients}
            placeholder='Nome do cliente'
            isRequired
            data-cy={`${referral}-name-input`}
          />
          {clientId && clientName && (
            <IconButton
              onClick={async () => {
                const { openModal } = useModal.getState()
                const Balances = (await import('../../../../view/Client/Balances')).default
                openModal(<Balances clientUuid={clientId} />)
              }}
              variant='solid'
              colorScheme='blue'
              rounded='xl'
              title='Saldos do cliente'
              aria-label='Saldos do cliente'
              icon='circledDollar'
            />
          )}
        </Flex>
        <TransferReferralTransferTypeFields referral={referral} />
      </Stack>
    </Box>
  )
}
