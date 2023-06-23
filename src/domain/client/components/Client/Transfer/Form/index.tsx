import { Button, Flex, Stack } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import TransferReferral from './TransferReferral'
import { type ClientTransferFormValues } from './types'

type Props = {
  onSubmit: (values: ClientTransferFormValues) => void
  initialValues: ClientTransferFormValues
}
export default function ClientTransferForm({ initialValues, onSubmit }: Props): JSX.Element {
  const { handleSubmit, control } = useForm<ClientTransferFormValues>({
    defaultValues: initialValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack align='center' spacing={8}>
        <Flex justify='space-between' flexWrap='wrap' w='full' gap={8}>
          <TransferReferral control={control} referral='from' />
          {/* <Divider orientation='vertical' h={40} /> */}
          <TransferReferral control={control} referral='to' />
        </Flex>
        <Button type='submit' colorScheme='green' w='full' maxW={300}>
          Transferir
        </Button>
      </Stack>
    </form>
  )
}
