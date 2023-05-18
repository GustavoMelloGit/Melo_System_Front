import {
  Button,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { Controller } from 'react-hook-form'
import AutocompleteInput from '../../../../../shared/components/inputs/Autocomplete'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
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
    formState: { isSubmitting, errors },
    control,
  } = form

  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent p={2} pb={4}>
        <ModalCloseButton data-cy='close-modal-button' />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Buscar café
          </Heading>
        </ModalHeader>
        <ModalBody pb={5}>
          <VStack
            as='form'
            spacing={6}
            onSubmit={handleSubmit(onSubmit)}
            data-cy='pickupCoffee-form'
          >
            <Grid templateColumns={['1fr', 'repeat(2, 1fr)']} gap={2}>
              <GridItem>
                <Controller
                  name='clientName'
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <AutocompleteInput
                      label='Cliente'
                      options={clients?.map((client) => ({
                        label: `${
                          client.nickname ? `${client.name} (${client.nickname})` : `${client.name}`
                        }`,
                        value: client.name,
                      }))}
                      isLoading={isLoading}
                      handleChange={onChange}
                      placeholder='Ex.: João da Silva'
                      isRequired
                      {...field}
                    />
                  )}
                />
              </GridItem>
              <GridItem>
                <ControllerField
                  control={control}
                  required
                  name='bags'
                  label='Sacos'
                  type='number'
                  min={1}
                  inputMode='numeric'
                  errors={errors}
                  data-cy='bags-input'
                />
              </GridItem>
              <GridItem colSpan={[1, 2]}>
                <ControllerField
                  control={control}
                  required
                  name='address'
                  label='Endereço'
                  data-cy='address-input'
                />
              </GridItem>
            </Grid>
            <Button
              isLoading={isSubmitting}
              type='submit'
              w='full'
              data-cy='submit-pickupCoffee-button'
              colorScheme='green'
            >
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
