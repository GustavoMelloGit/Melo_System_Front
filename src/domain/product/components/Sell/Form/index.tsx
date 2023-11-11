import { Button, Divider, Flex, Show, Stack } from '@chakra-ui/react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { dateInputToApiDate } from '../../../../../lib/utils/date'
import ProductItem from './ProductItem'
import SellProductSummary from './Summary'
import { EmptyProduct, type SellProductFormValues } from './types'

type Props = {
  onSubmit: (values: SellProductFormValues) => void
  initialValues: SellProductFormValues
}
export default function SellProductForm({ onSubmit, initialValues }: Props): JSX.Element {
  // const validationSchema = yup.object().shape({
  //   fertilizerName: yup.string().required(validationErrors.fatherNameIsRequired),
  //   bags: yup.number().required(validationErrors.bagsIsRequired),
  //   pricePerBag: yup.number().required(validationErrors.pricePerBagIsRequired),
  //   deliveryDate: yup.string().required(validationErrors.deliveryDateIsRequired),
  //   brook: yup.string().when('shouldDeliver', {
  //     is: true,
  //     then: yup.string().required(validationErrors.brookIsRequired),
  //   }),
  //   complement: yup.string().when('shouldDeliver', {
  //     is: true,
  //     then: yup.string().required(validationErrors.complementIsRequired),
  //   }),
  // })
  const methods = useForm<SellProductFormValues>({
    defaultValues: initialValues,
    // resolver: yupResolver(validationSchema),
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
        onSubmit={handleSubmit(async ({ client, products }) => {
          const formattedProducts: SellProductFormValues['products'] = products.map(
            ({ quantity, price, deliveryDate, ...product }) => ({
              ...product,
              quantity: Number(quantity),
              price: price * 100,
              deliveryDate: dateInputToApiDate(deliveryDate),
            }),
          )
          onSubmit({ client, products: formattedProducts })
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
                  append(EmptyProduct)
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
