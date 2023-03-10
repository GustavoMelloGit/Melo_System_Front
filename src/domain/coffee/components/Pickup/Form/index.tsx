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
import RHFField from '../../../../../shared/components/inputs/RHFField'
import SpinLoader from '../../../../../shared/components/SpinLoader'
import { type PickupFormValues } from '../../../types/model/pickup'
import usePickupForm from './usePickupForm'

export type Props = {
  onSubmit: (values: PickupFormValues) => Promise<void>
  initialValues?: PickupFormValues
}

export default function CoffeePickupForm({ onSubmit, initialValues }: Props): JSX.Element {
  const { closeModal, form, isLoading, clients } = usePickupForm({
    initialValues,
  })
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = form

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
                  errors={errors}
                  {...(isLoading && {
                    rightIcon: <SpinLoader />,
                  })}
                />
                {clients?.length !== 0 && (
                  <datalist id='client-list'>
                    {clients?.map((client) => (
                      <option key={client.id} value={client.name}>
                        {client.name} {client.nickname && `(${client.nickname})`}
                      </option>
                    ))}
                  </datalist>
                )}
              </GridItem>
              <GridItem>
                <RHFField
                  name='bags'
                  label='Sacos'
                  type='number'
                  register={register}
                  min={1}
                  inputMode='numeric'
                  errors={errors}
                />
              </GridItem>
              <GridItem colSpan={[1, 2]}>
                <RHFField name='address' label='Endereço' errors={errors} register={register} />
              </GridItem>
            </Grid>
            <Button isLoading={isSubmitting} type='submit' w='full'>
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
