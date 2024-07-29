import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import { currencyToCents, formatCurrency } from '../../../../../../../../lib/utils/formatters'
import { calculateCoffeeValuePerWeight } from '../../../../../../../../lib/utils/math'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import { type BuyEscolhaFormValues } from '../../types/esolha'

const validationSchema = yup.object().shape({
  bags: yup
    .number()
    .typeError(validationErrors.bagsIsInvalid)
    .required(validationErrors.bagsIsRequired),
  weight: yup
    .number()
    .typeError(validationErrors.weightIsInvalid)
    .required(validationErrors.weightIsRequired),
  valuePerWeight: yup
    .number()
    .typeError(validationErrors.valuePerWeightIsInvalid)
    .required(validationErrors.valuePerWeightIsRequired),
  brook: yup.string(),
  complement: yup.string(),
})

type Props = {
  onSubmit: (values: BuyEscolhaFormValues) => Promise<void>
  initialValues: BuyEscolhaFormValues
}
const BuyEscolhaFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const [pickupCoffee, setPickupCoffee] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<BuyEscolhaFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const currentBags = Number(watch('bags'))
  const currentWeight = Number(watch('weight'))
  const currentValuePerWeight = watch('valuePerWeight')
  const totalValue = calculateCoffeeValuePerWeight(
    currentBags,
    currentWeight,
    currentValuePerWeight,
  )
  return (
    <form
      onSubmit={handleSubmit(async ({ valuePerWeight, complement, brook, ...values }) => {
        await onSubmit({
          ...values,
          valuePerWeight: currencyToCents(valuePerWeight),
          ...(pickupCoffee && {
            complement,
            brook,
          }),
        })
      })}
    >
      <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={4}>
        <GridItem>
          <ControllerField<BuyEscolhaFormValues>
            control={control}
            name='bags'
            label='Sacos'
            type='number'
            inputMode='numeric'
            required
          />
        </GridItem>
        <GridItem>
          <ControllerField<BuyEscolhaFormValues>
            control={control}
            name='weight'
            label='Quilos'
            type='number'
            inputMode='numeric'
            required
          />
        </GridItem>
        <GridItem>
          <RHFCurrencyInput<BuyEscolhaFormValues>
            control={control}
            name='valuePerWeight'
            label='Valor por quilo'
            leftIcon='R$'
            isRequired
          />
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel htmlFor='totalValue'>Valor total</FormLabel>
            <Input
              disabled
              id='totalValue'
              variant='filled'
              rounded='xl'
              value={formatCurrency(totalValue * 100)}
            />
          </FormControl>
        </GridItem>
        <GridItem gridColumn={'-1 / 1'}>
          <ControllerField
            control={control}
            name='description'
            label='Observação'
            CustomInput={<Textarea />}
          />
        </GridItem>
      </Grid>
      <Stack mt={4}>
        <Checkbox
          isChecked={pickupCoffee}
          onChange={(e) => {
            setPickupCoffee(e.target.checked)
          }}
        >
          Café a buscar
        </Checkbox>
        <Flex gap={4}>
          <ControllerField
            control={control}
            name='brook'
            isDisabled={!pickupCoffee}
            label='Córrego'
            flex={1}
          />
          <ControllerField
            control={control}
            name='complement'
            isDisabled={!pickupCoffee}
            label='Referência'
            flex={1}
          />
        </Flex>
      </Stack>
      <Button isLoading={isSubmitting} w='full' mt={4} type='submit' colorScheme='blue'>
        Comprar
      </Button>
    </form>
  )
}
export default BuyEscolhaFormView
