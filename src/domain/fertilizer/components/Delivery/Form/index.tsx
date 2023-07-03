import {
  Button,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import { formatInputDateString } from '../../../../../lib/utils/date'
import AutocompleteInput from '../../../../../shared/components/inputs/Autocomplete'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import useDebounce from '../../../../../shared/hooks/useDebounce'
import { useModal } from '../../../../../shared/hooks/useModal'
import { getClientsService } from '../../../../client/service'
import { getFertilizersService } from '../../../services/get'
import { type FertilizerDeliveryFormValues } from '../../../types/model/Delivery'

const validationSchema = yup.object().shape({
  clientName: yup.string().required(validationErrors.clientNameIsRequired),
  fertilizerId: yup.string().required(validationErrors.fertilizerIsRequired),
  amount: yup
    .string()
    .required(validationErrors.amountIsRequired)
    .min(1, validationErrors.amountIsInvalid),
  brook: yup.string().required(validationErrors.brookIsRequired),
  complement: yup.string().required(validationErrors.complementIsRequired),
})

export type Props = {
  onSubmit: (values: FertilizerDeliveryFormValues) => Promise<void>
  initialValues?: FertilizerDeliveryFormValues
}

export default function FertilizerDeliveryForm({ onSubmit, initialValues }: Props): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<FertilizerDeliveryFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const clientName = watch('clientName')
  const debouncedClientName = useDebounce(clientName, 300)
  const { data: clients, isLoading: isLoadingClients } = getClientsService(
    `searchableName=${debouncedClientName}&limit=10`,
  )
  const fertilizerId = watch('fertilizerId')
  const { data: fertilizers, isLoading: isLoadingFertilizers } = getFertilizersService(
    `name=${fertilizerId}`,
  )

  useEffect(() => {
    if (!clients) return
    if (clients.data.length === 1) {
      const [client] = clients.data
      const { address } = client
      setValue('brook', address.brook ?? '')
      setValue('complement', address.complement ?? '')
    }
  }, [clients])

  return (
    <Modal isOpen isCentered onClose={closeModal}>
      <ModalOverlay />
      <ModalContent p={2} maxW={700}>
        <ModalCloseButton data-cy='close-modal-button' />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Entrega de adubo
          </Heading>
        </ModalHeader>
        <ModalBody>
          <VStack
            as='form'
            spacing={6}
            onSubmit={handleSubmit(async (values) => {
              await onSubmit({
                ...values,
                amount: Number(values.amount),
                date: formatInputDateString(values.date),
              })
            })}
            data-cy='pickupCoffee-form'
          >
            <Grid w='full' gridTemplateColumns='repeat(auto-fit, minmax(240px, 1fr))' gap={2}>
              <Controller
                name='clientName'
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <AutocompleteInput
                    label='Cliente'
                    options={clients?.data?.map((client) => ({
                      label: client.name,
                      value: client.name,
                    }))}
                    isLoading={isLoadingClients}
                    handleChange={onChange}
                    placeholder='Nome do cliente'
                    isRequired
                    {...field}
                  />
                )}
              />
              <Controller
                name='fertilizerId'
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <AutocompleteInput
                    label='Adubo'
                    options={fertilizers?.data?.map((fertilizer) => ({
                      label: fertilizer.name,
                      value: fertilizer.id,
                    }))}
                    isLoading={isLoadingFertilizers}
                    handleChange={onChange}
                    placeholder='Nome do adubo'
                    isRequired
                    {...field}
                  />
                )}
              />
              <ControllerField<FertilizerDeliveryFormValues>
                control={control}
                required
                name='amount'
                label='Quantidade'
                data-cy='brook-input'
                placeholder='Quantidade'
                type='number'
                inputMode='numeric'
              />
              <ControllerField<FertilizerDeliveryFormValues>
                control={control}
                required
                name='date'
                label='Data de entrega'
                data-cy='date-input'
                placeholder='Data de entrega'
                type='date'
              />
              <ControllerField<FertilizerDeliveryFormValues>
                control={control}
                required
                name='brook'
                label='Córrego'
                data-cy='brook-input'
                placeholder='Nome do córrego'
              />
              <ControllerField<FertilizerDeliveryFormValues>
                control={control}
                required
                name='complement'
                label='Referência'
                data-cy='complement-input'
                placeholder='Referência'
              />
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
