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
    name: `from.value`,
  })
  const bebida = useWatch({
    control,
    name: `from.bebida`,
  })
  const coffeeType = useWatch({
    control,
    name: `from.coffeeType`,
  })
  const bags = useWatch({
    control,
    name: `from.bags`,
  })
  const weight = useWatch({
    control,
    name: `from.weight`,
  })

  const mirrorFromValuesIntoToValues = (
    field: Path<ClientTransferFormValues>,
    value: any,
  ): void => {
    setValue(field, value)
  }

  useEffect(() => {
    mirrorFromValuesIntoToValues(`to.transferType`, transferType)
    mirrorFromValuesIntoToValues(`to.value`, value)
    mirrorFromValuesIntoToValues(`to.bebida`, bebida)
    mirrorFromValuesIntoToValues(`to.coffeeType`, coffeeType)
    mirrorFromValuesIntoToValues(`to.bags`, bags)
    mirrorFromValuesIntoToValues(`to.weight`, weight)
  }, [transferType, value, bebida, coffeeType, bags, weight])

  return (
    <Stack spacing={4}>
      <Flex gap={2}>
        <Controller
          control={control}
          name={`${referral}.transferType`}
          render={({ field: { onChange, ...field } }) => (
            <FormControl>
              <FormLabel htmlFor={field.name}>Tipo de transferência</FormLabel>
              <Select
                id={field.name}
                {...selectFieldStyle}
                onChange={(e) => {
                  console.log(e.target.value)
                  console.log(field)
                  onChange(e)
                }}
                data-cy={`${referral}-transferType-input`}
                {...field}
              >
                <option value='currency'>Dinheiro</option>
                <option value='coffee'>Café</option>
                <option value='escolha'>Escolha</option>
                <option value='bags'>Sacaria</option>
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
            data-cy={`${referral}-currency-input`}
          />
        )}
      </Flex>
      {transferType === 'coffee' && (
        <>
          <Flex gap={2}>
            <RHFSelectField
              name={`${referral}.coffeeType`}
              register={register}
              label='Tipo de café'
              data-cy={`${referral}-coffeeType-input`}
              options={Object.entries(CoffeeTypesForm).map(([value, label]) => ({
                value,
                label,
              }))}
            />
            <RHFSelectField
              register={register}
              name={`${referral}.bebida`}
              label='Bebida'
              data-cy={`${referral}-bebida-input`}
              options={Object.entries(CoffeeBebidasLabel).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Flex>
        </>
      )}
      {(transferType === 'coffee' || transferType === 'escolha') && (
        <>
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
              data-cy={`${referral}-bags-input`}
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
              data-cy={`${referral}-weight-input`}
            />
          </Flex>
        </>
      )}
      {transferType === 'bags' && (
        <ControllerField
          control={control}
          name={`${referral}.value`}
          label='Sacas'
          type='number'
          inputMode='numeric'
          min={0}
          placeholder='Ex.: 10'
          required
          rightIcon={<GiChipsBag />}
          data-cy={`${referral}-bagsValue-input`}
        />
      )}
    </Stack>
  )
}
