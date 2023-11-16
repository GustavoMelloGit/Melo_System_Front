import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import ControllerAutocomplete from '../../../../../shared/components/inputs/ControllerAutocomplete'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import NumberInput from '../../../../../shared/components/inputs/NumberInput'
import RHFCurrencyInput from '../../../../../shared/components/inputs/RHFCurrencyInput'
import useDebounce from '../../../../../shared/hooks/useDebounce'
import { getFertilizersService } from '../../../../fertilizer/services/get'
import { type SellProductFormValues } from './types'

type Props = {
  itemIndex: number
  removeProduct: () => void
}
export default function ProductItem({ itemIndex, removeProduct }: Props): JSX.Element {
  const [collapseDetails, setCollapseDetails] = useState(true)
  const { control } = useFormContext<SellProductFormValues>()
  const productName = useWatch({ control, name: `products.${itemIndex}.productName` })
  const shouldDelivery = useWatch({ control, name: `products.${itemIndex}.shouldDeliver` })
  const price = useWatch({ control, name: `products.${itemIndex}.price` })
  const quantity = useWatch({ control, name: `products.${itemIndex}.quantity` })
  const debouncedProductName = useDebounce(productName, 400)

  const totalPrice = formatCurrency(price * quantity * 100)

  const toggleCollapse = (): void => {
    setCollapseDetails((prev) => !prev)
  }

  const { data: fertilizers, isLoading: isLoadingFertilizers } = getFertilizersService(
    `name=${debouncedProductName}`,
  )

  return (
    <Card>
      <CardHeader position='relative'>
        <Flex gap={2} align='center'>
          <Button
            bg='transparent'
            inset={0}
            minW='unset'
            minH='unset'
            p={0}
            h={8}
            w={8}
            onClick={toggleCollapse}
          >
            {collapseDetails ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
          <Stack spacing={0.5} flex={1}>
            <Flex justify='space-between' gap={2}>
              <Text fontWeight={700}>{productName || `Selecione o Produto`}</Text>
              <Tag colorScheme='green' variant='outline' h={3} minW='max-content'>
                {formatCurrency(price * 100)}
              </Tag>
            </Flex>
            <Flex justify='space-between' fontSize='sm'>
              <Text>Qtd.: {quantity}</Text>
              {itemIndex > 0 && (
                <Button
                  fontSize='inherit'
                  variant='link'
                  onClick={removeProduct}
                  colorScheme='red'
                  h='unset'
                >
                  Remover
                </Button>
              )}
            </Flex>
          </Stack>
        </Flex>
      </CardHeader>
      <Collapse in={collapseDetails}>
        <CardBody>
          <Stack spacing={4}>
            <ControllerAutocomplete<SellProductFormValues>
              control={control}
              name={`products.${itemIndex}.productId`}
              auxName={`products.${itemIndex}.productName`}
              options={fertilizers?.data?.map((fertilizer) => ({
                label: `${fertilizer.name} ${fertilizer.description ?? ''}`,
                value: fertilizer.id,
                key: fertilizer.id,
              }))}
              isLoading={isLoadingFertilizers}
              placeholder='Nome do produto'
              label='Produto'
              isRequired
            />

            <Box display='grid' gridTemplateColumns='repeat(auto-fit, minmax(230px, 1fr))' gap={4}>
              <RHFCurrencyInput
                name={`products.${itemIndex}.price`}
                label='Preço de venda'
                control={control}
                leftIcon='R$'
                isRequired
              />
              <Controller
                control={control}
                name={`products.${itemIndex}.quantity`}
                render={({ field }) => (
                  <NumberInput
                    label='Quantidade'
                    isRequired
                    placeholder='Insira a quantidade'
                    {...field}
                  />
                )}
              />
              <FormControl>
                <FormLabel htmlFor='totalPrice'>Valor total</FormLabel>
                <Input
                  rounded='xl'
                  id='totalPrice'
                  isDisabled
                  value={totalPrice}
                  variant='filled'
                />
              </FormControl>
            </Box>
            <Controller
              control={control}
              name={`products.${itemIndex}.shouldDeliver`}
              render={({ field: { onChange, value, ...field } }) => (
                <Checkbox
                  isChecked={value}
                  onChange={(e) => {
                    onChange(e.target.checked)
                  }}
                  {...field}
                >
                  Produto a entregar
                </Checkbox>
              )}
            />
            <Box display='grid' gridTemplateColumns='repeat(auto-fit, minmax(230px, 1fr))' gap={4}>
              <ControllerField
                name={`products.${itemIndex}.deliveryDate`}
                control={control}
                label='Data de entrega'
                type='date'
                isDisabled={!shouldDelivery}
                required
              />
              <ControllerField
                control={control}
                name={`products.${itemIndex}.brook`}
                isDisabled={!shouldDelivery}
                label='Córrego'
                required
              />
              <ControllerField
                control={control}
                name={`products.${itemIndex}.complement`}
                isDisabled={!shouldDelivery}
                label='Referência'
                required
              />
            </Box>
            <ControllerField
              control={control}
              name={`products.${itemIndex}.description`}
              CustomInput={<Textarea />}
              placeholder='Escreva uma observação'
              id='description'
              label='Observação'
            />
          </Stack>
        </CardBody>
      </Collapse>
    </Card>
  )
}
