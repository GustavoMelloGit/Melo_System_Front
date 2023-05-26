import { Button, Flex, Grid, GridItem, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { CoffeeTypeHasBebida } from '../../../../../../../../lib/constants/coffee'
import ControllerField from '../../../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../../../shared/components/inputs/RHFCurrencyInput'
import MoreInfoTooltip from '../../../../../../../../shared/components/MoreInfoTooltip'
import { CoffeeBebidasLabel } from '../../../../../../../coffee/types/model/coffee'
import { type BuyCoffeeFormValues } from '../../types'

type Props = {
  onSubmit: (values: BuyCoffeeFormValues) => void
  initialValues: BuyCoffeeFormValues
}
const BuyCoffeeFormView = ({ onSubmit, initialValues }: Props): JSX.Element => {
  const { handleSubmit, control, watch } = useForm<BuyCoffeeFormValues>({
    defaultValues: initialValues,
  })
  const currentCoffeeType = watch('coffeeType')
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <GridItem colSpan={2} display='flex'>
          <ControllerField<BuyCoffeeFormValues>
            control={control}
            name='address'
            label={
              <Flex align={'center'} gap={1}>
                Endereço
                <MoreInfoTooltip
                  label='Preenchendo o campo de endereço o café automaticamente irá para a lista de cafés a buscar.'
                  size={16}
                />
              </Flex>
            }
          />
        </GridItem>
      </Grid>
      <Button w='full' mt={4} type='submit'>
        Comprar
      </Button>
    </form>
  )
}
export default BuyCoffeeFormView
