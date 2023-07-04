import { Button, Checkbox, FormControl, FormLabel, Grid, GridItem, Input } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../../../../lib/errors'
import { formatCurrency } from '../../../../../../../../lib/utils/formatters'
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
  onSubmit: (values: BuyEscolhaFormValues) => void
  initialValues: BuyEscolhaFormValues
}
const BuyEscolhaFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const [pickupCoffee, setPickupCoffee] = useState<boolean>(true)
  const { handleSubmit, control, watch } = useForm<BuyEscolhaFormValues>({
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
      onSubmit={handleSubmit(({ valuePerWeight, ...values }) => {
        onSubmit({
          ...values,
          valuePerWeight: valuePerWeight * 100,
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
        <GridItem colSpan={2}>
          <Checkbox
            isChecked={pickupCoffee}
            onChange={(e) => {
              setPickupCoffee(e.target.checked)
            }}
          >
            Escolha a buscar
          </Checkbox>
        </GridItem>
        <GridItem display='flex'>
          <ControllerField<BuyEscolhaFormValues>
            control={control}
            name='brook'
            isDisabled={!pickupCoffee}
            label='Córrego'
          />
        </GridItem>
        <GridItem display='flex'>
          <ControllerField<BuyEscolhaFormValues>
            control={control}
            name='complement'
            isDisabled={!pickupCoffee}
            label='Referência'
          />
        </GridItem>
      </Grid>
      <Button w='full' mt={4} type='submit' colorScheme='blue'>
        Comprar
      </Button>
    </form>
  )
}
export default BuyEscolhaFormView
