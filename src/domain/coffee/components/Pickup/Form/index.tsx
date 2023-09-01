import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { ClientNameParser } from '../../../../../lib/utils/clientNameParser'
import ControllerAutocomplete from '../../../../../shared/components/inputs/ControllerAutocomplete'
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
    formState: { isSubmitting },
    control,
  } = form

  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalCloseButton data-cy='close-modal-button' />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Buscar café
          </Heading>
        </ModalHeader>
        <ModalBody>
          <VStack
            as='form'
            spacing={6}
            onSubmit={handleSubmit(onSubmit)}
            data-cy='pickupCoffee-form'
          >
            <Stack spacing={2} w='full'>
              <ControllerAutocomplete
                control={control}
                name='clientId'
                auxName='clientName'
                options={clients?.map((client) => ({
                  label: `${
                    client.nickname
                      ? ClientNameParser.addNickname(client.name, client.nickname)
                      : `${client.name}`
                  }`,
                  value: client.id,
                }))}
                placeholder='Ex.: João da Silva'
                isRequired
                isLoading={isLoading}
              />
              <Flex gap={2}>
                <ControllerField<PickupFormValues>
                  control={control}
                  required
                  name='bags'
                  label='Sacos'
                  type='number'
                  min={1}
                  inputMode='numeric'
                  data-cy='bags-input'
                />
                <ControllerField<PickupFormValues>
                  control={control}
                  required
                  name='brook'
                  label='Córrego'
                  data-cy='brook-input'
                  placeholder='Informe o córrego'
                />
              </Flex>
              <ControllerField<PickupFormValues>
                control={control}
                required
                name='complement'
                label='Referência'
                data-cy='complement-input'
                placeholder='Informe a referência'
              />
            </Stack>
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
