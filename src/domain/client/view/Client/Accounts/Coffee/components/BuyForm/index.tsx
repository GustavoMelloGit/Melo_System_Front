import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { CoffeeTypeHasBebida } from '../../../../../../../../lib/constants/coffee'
import { validationErrors } from '../../../../../../../../lib/errors'
import { formatCurrency } from '../../../../../../../../lib/utils/formatters'
import { calculateCoffeeTotalValue } from '../../../../../../../../lib/utils/math'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import {
  CoffeeBebidasLabel,
  type CoffeeTypes,
} from '../../../../../../../coffee/types/model/coffee'
import { type BuyCoffeeFormValues } from '../../types'

const validationSchema = yup.object().shape({
  coffeeType: yup.string().required(validationErrors.coffeeTypeIsRequired),
  bebida: yup.string().when('coffeeType', {
    is: (coffeeType: CoffeeTypes) => CoffeeTypeHasBebida.includes(coffeeType),
    then: yup.string().required(validationErrors.bebidaIsRequired),
  }),
  bags: yup
    .number()
    .typeError(validationErrors.bagsIsInvalid)
    .required(validationErrors.bagsIsRequired),
  weight: yup
    .number()
    .typeError(validationErrors.weightIsInvalid)
    .required(validationErrors.weightIsRequired),
  valuePerBag: yup
    .number()
    .typeError(validationErrors.valuePerBagIsInvalid)
    .required(validationErrors.valuePerBagIsRequired),
  brook: yup.string(),
  complement: yup.string(),
})

type Props = {
  onSubmit: (values: BuyCoffeeFormValues) => Promise<void>
  initialValues: BuyCoffeeFormValues
}
const BuyCoffeeFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const [pickupCoffee, setPickupCoffee] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting },
  } = useForm<BuyCoffeeFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  })
  const currentCoffeeType = watch('coffeeType')
  const currentBags = watch('bags')
  const currentWeight = watch('weight')
  const currentValuePerBag = watch('valuePerBag')
  const totalValue = calculateCoffeeTotalValue(currentBags, currentWeight, currentValuePerBag)
  return (
    <form
      onSubmit={handleSubmit(async ({ valuePerBag, brook, complement, ...values }) => {
        await onSubmit({
          ...values,
          valuePerBag: valuePerBag * 100,
          ...(pickupCoffee && {
            complement,
            brook,
          }),
        })
      })}
    >
      <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' gap={4}>
        <GridItem>
          <ControllerField<BuyCoffeeFormValues>
            control={control}
            name='coffeeType'
            label='Tipo de café'
            required
            CustomInput={
              <Select>
                <option value={'bica_corrida'}>Bica Corrida</option>
                <option value={'conilon'}>Conilon</option>
                <option value={'despolpado'}>Despolpado</option>
              </Select>
            }
          />
        </GridItem>
        {CoffeeTypeHasBebida.includes(currentCoffeeType) && (
          <GridItem>
            <ControllerField<BuyCoffeeFormValues>
              control={control}
              name='bebida'
              label='Bebida'
              required
              CustomInput={
                <Select>
                  {Object.entries(CoffeeBebidasLabel).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              }
            />
          </GridItem>
        )}
        <GridItem>
          <ControllerField<BuyCoffeeFormValues>
            control={control}
            name='bags'
            label='Sacos'
            type='number'
            inputMode='numeric'
            required
          />
        </GridItem>
        <GridItem>
          <ControllerField<BuyCoffeeFormValues>
            control={control}
            name='weight'
            label='Quilos'
            type='number'
            inputMode='numeric'
            required
          />
        </GridItem>
        <GridItem>
          <RHFCurrencyInput<BuyCoffeeFormValues>
            control={control}
            name='valuePerBag'
            label='Valor por saco'
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
          <ControllerField<BuyCoffeeFormValues>
            control={control}
            name='brook'
            isDisabled={!pickupCoffee}
            label='Córrego'
            flex={1}
          />
          <ControllerField<BuyCoffeeFormValues>
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
export default BuyCoffeeFormView
