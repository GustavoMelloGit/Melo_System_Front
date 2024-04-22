import { Button, Divider, Flex, Show, Stack } from '@chakra-ui/react'
import currency from 'currency.js'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { dateInputToApiDate } from '../../../../../lib/utils/date'
import ProductItem from './ProductItem'
import SellProductSummary from './Summary'
import { type ProductFormValues, type SellProductFormValues } from './types'

type Props = {
  onSubmit: (values: SellProductFormValues) => Promise<void>
  initialValues: SellProductFormValues
  emptyProduct: ProductFormValues
}
export default function SellProductForm({
  onSubmit,
  initialValues,
  emptyProduct,
}: Props): JSX.Element {
  const methods = useForm<SellProductFormValues>({
    defaultValues: initialValues,
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = methods
  const { fields, append, remove } = useFieldArray({ control, name: 'products' })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(async ({ products }) => {
          const formattedProducts: SellProductFormValues['products'] = products.map(
            ({ quantity, price, deliveryDate, ...product }) => ({
              ...product,
              quantity: Number(quantity),
              price: currency(price).multiply(100).value,
              deliveryDate: dateInputToApiDate(deliveryDate),
            }),
          )
          await onSubmit({ products: formattedProducts })
        })}
      >
        <Flex gap={4} flexWrap='wrap'>
          <Stack spacing={4} flex={2}>
            {fields.map((item, index) => (
              <ProductItem
                key={item.id}
                itemIndex={index}
                removeProduct={() => {
                  remove(index)
                }}
              />
            ))}
            <Flex gap={2}>
              <Button
                disabled={isSubmitting}
                onClick={() => {
                  append(emptyProduct)
                }}
                colorScheme='blue'
                w='full'
              >
                Adicionar Produto
              </Button>
            </Flex>
          </Stack>
          <Show below='sm'>
            <Divider />
          </Show>
          <SellProductSummary />
        </Flex>
      </form>
    </FormProvider>
  )
}
