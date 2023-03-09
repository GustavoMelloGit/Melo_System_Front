import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import SpinLoader from '../../../../../shared/components/SpinLoader'
import { useModal } from '../../../../../shared/hooks/useModal'
import { getClientsService } from '../../../../client/service'
import { type PickupFormValues } from '../../../types/pickup'

export type Props = {
  onSubmit: (values: PickupFormValues) => Promise<void>
}
export default function CoffeePickupForm({ onSubmit }: Props): JSX.Element {
  const { register, handleSubmit } = useForm<PickupFormValues>()
  const closeModal = useModal((state) => state.closeModal)
  const { data, isLoading } = getClientsService()
  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent p={2} pb={4}>
        <ModalHeader>Buscar café</ModalHeader>
        <ModalBody>
          <VStack as='form' spacing={6} onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap={2}>
              <GridItem>
                <RHFField
                  name='clientName'
                  label='Cliente'
                  register={register}
                  list='client-list'
                  {...(isLoading && {
                    leftIcon: <SpinLoader />,
                  })}
                />
                <datalist id='client-list'>
                  {data?.map((client) => (
                    <option key={client.id} value={client.name}>
                      {client.name} {client.nickname && `(${client.nickname})`}
                    </option>
                  ))}
                </datalist>
              </GridItem>
              <GridItem>
                <RHFField
                  name='bags'
                  label='Sacos'
                  type='number'
                  register={register}
                  min={1}
                  inputMode='numeric'
                />
              </GridItem>
              <GridItem colSpan={[1, 2]}>
                <RHFField name='address' label='Endereço' register={register} />
              </GridItem>
            </Grid>
            <Button type='submit' w='full'>
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
