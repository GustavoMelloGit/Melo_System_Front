import {
  Button,
  Grid,
  GridItem,
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
import RHFField from '../../../../../shared/components/inputs/RHFField'
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
    control,
  } = form

  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent p={2} pb={4}>
        <ModalCloseButton data-cy='close-modal-button' />
        <ModalHeader>Buscar café</ModalHeader>
        <ModalBody>
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
                      {...field}
                    />
                  )}
                />
                {/* <RHFField
                  name='clientName'
                  label='Cliente'
                  register={register}
                  list='client-list'
                  errors={errors}
                  data-cy='clientName-input'
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
                )} */}
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
                  data-cy='bags-input'
                />
              </GridItem>
              <GridItem colSpan={[1, 2]}>
                <RHFField
                  name='address'
                  label='Endereço'
                  errors={errors}
                  register={register}
                  data-cy='address-input'
                />
              </GridItem>
            </Grid>
            <Button
              isLoading={isSubmitting}
              type='submit'
              w='full'
              data-cy='submit-pickupCoffee-button'
            >
              Salvar
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
