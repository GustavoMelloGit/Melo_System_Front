import { Flex, FormControl, FormLabel, Select, Stack, type SelectProps } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch, type Path } from 'react-hook-form'
import { GiChipsBag } from 'react-icons/gi'
import ControllerField from '../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../shared/components/inputs/RHFCurrencyInput'
import RHFSelectField from '../../../../../../shared/components/inputs/RHFSelectField'
import { CoffeeBebidasLabel } from '../../../../../coffee/types/model/coffee'
import { CoffeeTypesForm } from '../../../../view/Client/Accounts/Coffee/types'
import { type ClientTransferFormValues, type Referral } from './types'

const valueLabelByReferral: Record<Referral, string> = {
  from: 'Valor a ser transferido',
  to: 'Valor a ser recebido',
}

const selectFieldStyle: SelectProps = {
  rounded: 'xl',
  variant: 'filled',
}

type Props = {
  referral: Referral
}
export default function TransferReferralTransferTypeFields({ referral }: Props): JSX.Element {
  const { setValue, control, register } = useFormContext<ClientTransferFormValues>()
  const transferType = useWatch({
    control,
    name: `${referral}.transferType`,
  })
  const value = useWatch({
    control,
    name: `${referral}.value`,
  })
  const bebida = useWatch({
    control,
    name: `${referral}.bebida`,
  })
  const coffeeType = useWatch({
    control,
    name: `${referral}.coffeeType`,
  })
  const bags = useWatch({
    control,
    name: `${referral}.bags`,
  })
  const weight = useWatch({
    control,
    name: `${referral}.weight`,
  })

  const mirrorFromValuesIntoToValues = (
    field: Path<ClientTransferFormValues>,
    value: any,
  ): void => {
    setValue(field, value)
  }

  useEffect(() => {
    if (referral === 'from') {
      mirrorFromValuesIntoToValues(`to.transferType`, transferType)
      mirrorFromValuesIntoToValues(`to.value`, value)
      mirrorFromValuesIntoToValues(`to.bebida`, bebida)
      mirrorFromValuesIntoToValues(`to.coffeeType`, coffeeType)
      mirrorFromValuesIntoToValues(`to.bags`, bags)
      mirrorFromValuesIntoToValues(`to.weight`, weight)
    }
  }, [transferType, value, bebida, coffeeType, bags, weight])

  return (
    <Stack spacing={4}>
      <Flex gap={2}>
        <Controller
          control={control}
          name={`${referral}.transferType`}
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor={field.name}>Tipo de transferência</FormLabel>
              <Select id={field.name} {...selectFieldStyle} {...field}>
                <option value='currency'>Dinheiro</option>
                <option value='coffee'>Café</option>
              </Select>
            </FormControl>
          )}
        />
        {transferType === 'currency' && (
          <RHFCurrencyInput
            control={control}
            leftIcon='R$'
            name={`${referral}.value`}
            label={valueLabelByReferral[referral]}
          />
        )}
      </Flex>
      {transferType === 'coffee' && (
        <>
          <Flex gap={2}>
            <RHFSelectField
              register={register}
              name={`${referral}.bebida`}
              label='Bebida'
              options={Object.entries(CoffeeBebidasLabel).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <RHFSelectField
              name={`${referral}.coffeeType`}
              register={register}
              label='Tipo de café'
              options={Object.entries(CoffeeTypesForm).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Flex>
          <Flex gap={2}>
            <ControllerField
              control={control}
              name={`${referral}.bags`}
              label='Sacos'
              type='number'
              inputMode='numeric'
              min={0}
              placeholder='Ex.: 10'
              required
              rightIcon={<GiChipsBag />}
            />
            <ControllerField
              name={`${referral}.weight`}
              label='Quilos'
              type='number'
              inputMode='numeric'
              control={control}
              min={0}
              placeholder='Ex.: 10'
              required
              rightIcon='Kg'
            />
          </Flex>
        </>
      )}
    </Stack>
  )
}
