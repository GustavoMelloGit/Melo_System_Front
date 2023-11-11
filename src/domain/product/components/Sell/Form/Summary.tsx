import { Button, Divider, Flex, Heading, Stack, Text, type FlexProps } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { formatCurrency } from '../../../../../lib/utils/formatters'
import { type SellProductFormValues } from './types'

export default function SellProductSummary(): JSX.Element {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<SellProductFormValues>()
  const products = useWatch({ control, name: 'products' })
  const selectedProducts = products.filter((p) => p.productName)
  const totalPrice = selectedProducts.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  const formattedTotalPrice = formatCurrency(totalPrice * 100)

  return (
    <Stack as='aside' flex={1} spacing={4} minWidth={300}>
      <Heading fontSize='2xl'>Resumo da venda</Heading>
      <Stack spacing={2} divider={<Divider />}>
        {selectedProducts.map((p) => (
          <Item
            key={`${p.productId}-${p.quantity}-${p.price}`}
            price={formatCurrency(p.price * p.quantity * 100)}
            label={p.productName}
          />
        ))}
        <Item fontWeight={700} label='Total da venda' price={formattedTotalPrice} />
      </Stack>
      <Button
        isLoading={isSubmitting}
        isDisabled={totalPrice === 0}
        type='submit'
        colorScheme='green'
        w='full'
      >
        Vender
      </Button>
    </Stack>
  )
}

type ItemProps = FlexProps & {
  label: ReactNode
  price: ReactNode
}
function Item({ price, label: product, ...props }: ItemProps): JSX.Element {
  return (
    <Flex
      align='center'
      justify='space-between'
      fontSize={{
        base: 'sm',
        sm: 'md',
      }}
      {...props}
    >
      <Text>{product}</Text>
      <Text fontWeight={700}>{price}</Text>
    </Flex>
  )
}
