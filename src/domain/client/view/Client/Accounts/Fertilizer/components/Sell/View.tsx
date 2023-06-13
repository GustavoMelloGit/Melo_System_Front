import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AutocompleteInput from '../../../../../../../../shared/components/inputs/Autocomplete'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import { getFertilizersService } from '../../../../../../../fertilizer/services/get'
import { type SellFertilizerFormValues } from './types'

type Props = {
  onClose: () => void
  initialValues: SellFertilizerFormValues
  onSubmit: (values: SellFertilizerFormValues) => Promise<void>
}
const SellFertilizerView = ({ onClose, initialValues, onSubmit }: Props): JSX.Element => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<SellFertilizerFormValues>({
    defaultValues: initialValues,
  })
  const [shouldDelivery, setShouldDelivery] = useState<boolean>(false)
  const fertilizerName = watch('fertilizerName')
  const pricePerBag = watch('pricePerBag')
  const bags = watch('bags')

  const { data: fertilizers, isLoading: isLoadingFertilizers } = getFertilizersService(
    `name=${fertilizerName}`,
  )
  return (
    <Modal isOpen isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={600}>
        <ModalCloseButton />
        <ModalHeader>
          <Heading as='h1' fontSize='3xl'>
            Vender Adubo
          </Heading>
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(async ({ brook, complement, ...values }) =>
              onSubmit({
                ...values,
                ...(shouldDelivery && { brook, complement }),
                pricePerBag: pricePerBag * 100,
              }),
            )}
          >
            <Stack spacing={4}>
              <Controller
                name='fertilizerName'
                control={control}
                render={({ field: { onChange, ...field } }) => (
                  <AutocompleteInput
                    label='Adubo'
                    options={fertilizers?.data?.map((fertilizer) => ({
                      label: fertilizer.name,
                      value: fertilizer.name,
                    }))}
                    isLoading={isLoadingFertilizers}
                    handleChange={onChange}
                    placeholder='Nome do adubo'
                    isRequired
                    {...field}
                  />
                )}
              />
              <Flex gap={4}>
                <RHFCurrencyInput
                  name='pricePerBag'
                  label='Valor p/ saca'
                  control={control}
                  leftIcon='R$'
                  isRequired
                />
                <ControllerField
                  control={control}
                  name='bags'
                  type='number'
                  label='Quantidade'
                  isRequired
                  placeholder='Insira a quantidade'
                />
              </Flex>
              <FormControl>
                <FormLabel htmlFor='totalPrice'>Valor total</FormLabel>
                <InputGroup>
                  <InputLeftAddon>R$</InputLeftAddon>
                  <Input
                    id='totalPrice'
                    isDisabled
                    value={Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(pricePerBag * bags)}
                    variant='filled'
                  />
                </InputGroup>
              </FormControl>
              <Checkbox
                isChecked={shouldDelivery}
                onChange={(e) => {
                  setShouldDelivery(e.target.checked)
                }}
              >
                Adubo a entregar
              </Checkbox>
              <Flex gap={4}>
                <ControllerField
                  control={control}
                  name='brook'
                  isDisabled={!shouldDelivery}
                  label='Córrego'
                />
                <ControllerField
                  control={control}
                  name='complement'
                  isDisabled={!shouldDelivery}
                  label='Referência'
                />
              </Flex>
              <Button isLoading={isSubmitting} type='submit' colorScheme='green'>
                Vender
              </Button>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default SellFertilizerView
