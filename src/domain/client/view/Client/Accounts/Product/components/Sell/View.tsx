import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import { dateInputToApiDate } from '../../../../../../../../lib/utils/date'
import ControllerAutocomplete from '../../../../../../../../shared/components/inputs/ControllerAutocomplete'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import Modal from '../../../../../../../../shared/components/Modal'
import { getFertilizersService } from '../../../../../../../fertilizer/services/get'
import { type SellProductFormValues } from './types'

type Props = {
  onClose: () => void
  initialValues: Required<SellProductFormValues>
  onSubmit: (values: SellProductFormValues) => Promise<void>
}

const SellProductView = ({ onClose, initialValues, onSubmit }: Props): JSX.Element => {
  const [shouldDelivery, setShouldDelivery] = useState<boolean>(true)

  const validationSchema = yup.object().shape({
    fertilizerName: yup.string().required(validationErrors.fatherNameIsRequired),
    bags: yup.number().required(validationErrors.bagsIsRequired),
    pricePerBag: yup.number().required(validationErrors.pricePerBagIsRequired),
    deliveryDate: yup.string().required(validationErrors.deliveryDateIsRequired),
    ...(shouldDelivery && {
      brook: yup.string().required(validationErrors.brookIsRequired),
      complement: yup.string().required(validationErrors.complementIsRequired),
    }),
  })
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<SellProductFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const fertilizerName = watch('fertilizerName')
  const pricePerBag = watch('pricePerBag')
  const bags = watch('bags')

  const { data: fertilizers, isLoading: isLoadingFertilizers } = getFertilizersService(
    `name=${fertilizerName}`,
  )
  return (
    <Modal isOpen isCentered onClose={onClose}>
      <Modal.Content maxW={600}>
        <Modal.CloseButton />
        <Modal.Header>
          <Heading as='h1' fontSize='3xl'>
            Vender Produto
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(async ({ brook, complement, deliveryDate, ...values }) =>
              onSubmit({
                ...values,
                ...(shouldDelivery && { brook, complement }),
                bags: Number(bags),
                pricePerBag: pricePerBag * 100,
                deliveryDate: dateInputToApiDate(deliveryDate),
              }),
            )}
          >
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Text mr='auto'>Produto 1</Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Stack spacing={4}>
                    <ControllerAutocomplete
                      control={control}
                      name='fertilizerId'
                      auxName='fertilizerName'
                      options={fertilizers?.data?.map((fertilizer) => ({
                        label: `${fertilizer.name} ${fertilizer.description ?? ''}`,
                        value: fertilizer.id,
                        key: fertilizer.id,
                      }))}
                      isLoading={isLoadingFertilizers}
                      placeholder='Nome do adubo'
                      label='Adubo'
                      isRequired
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
                        required
                        placeholder='Insira a quantidade'
                      />
                    </Flex>
                    <Flex gap={4}>
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
                      <ControllerField
                        name='deliveryDate'
                        control={control}
                        label='Data de entrega'
                        type='date'
                        required
                      />
                    </Flex>
                    <Checkbox
                      isChecked={shouldDelivery}
                      onChange={(e) => {
                        setShouldDelivery(e.target.checked)
                      }}
                    >
                      Produto a entregar
                    </Checkbox>
                    <Flex gap={4}>
                      <ControllerField
                        control={control}
                        name='brook'
                        isDisabled={!shouldDelivery}
                        label='Córrego'
                        required
                      />
                      <ControllerField
                        control={control}
                        name='complement'
                        isDisabled={!shouldDelivery}
                        label='Referência'
                        required
                      />
                    </Flex>
                    <ControllerField
                      control={control}
                      name='description'
                      CustomInput={<Textarea />}
                      placeholder='Escreva uma observação'
                      id='description'
                      label='Observação'
                    />
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Button isLoading={isSubmitting} type='submit' colorScheme='green' w='full' mt={4}>
              Vender
            </Button>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default SellProductView
