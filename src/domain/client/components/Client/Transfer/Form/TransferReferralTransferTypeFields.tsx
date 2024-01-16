import { Flex, FormControl, FormLabel, Select, Stack, type SelectProps } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'
import { Controller, useFormContext, useWatch, type Path } from 'react-hook-form'
import { GiChipsBag } from 'react-icons/gi'
import objectEntries from '../../../../../../lib/utils/objectEntries'
import ControllerField from '../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../shared/components/inputs/RHFCurrencyInput'
import { CoffeeBebidasLabel, CoffeeTypesLabel } from '../../../../../coffee/types/model/coffee'
import { type ClientTransferFormValues, type Referral } from './types'

const valueLabelByReferral: Record<Referral, string> = {
  from: 'Valor a ser transferido',
  to: 'Valor a ser recebido',
}

const selectFieldStyle: SelectProps = {
  rounded: 'xl',
  variant: 'filled',
}

const { escolha, ...coffeeTypesOptions } = CoffeeTypesLabel

type Props = {
  referral: Referral
}
export default function TransferReferralTransferTypeFields({ referral }: Props): JSX.Element {
  const { setValue, control } = useFormContext<ClientTransferFormValues>()
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

  const mirrorFromValuesIntoToValues = useCallback(
    (field: Path<ClientTransferFormValues>, value: Parameters<typeof setValue>[1]): void => {
      setValue(field, value)
    },
    [setValue],
  )

  useEffect(() => {
    mirrorFromValuesIntoToValues(`to.transferType`, transferType)
    mirrorFromValuesIntoToValues(`to.value`, value)
    mirrorFromValuesIntoToValues(`to.bebida`, bebida)
    mirrorFromValuesIntoToValues(`to.coffeeType`, coffeeType)
    mirrorFromValuesIntoToValues(`to.bags`, bags)
    mirrorFromValuesIntoToValues(`to.weight`, weight)
  }, [transferType, value, bebida, coffeeType, bags, weight, mirrorFromValuesIntoToValues])

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
            <ControllerField
              name={`${referral}.coffeeType`}
              control={control}
              label='Tipo de café'
              required
              data-cy={`${referral}-coffeeType-input`}
              CustomInput={
                <Select>
                  {objectEntries(coffeeTypesOptions).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              }
            />
            <ControllerField
              control={control}
              name={`${referral}.bebida`}
              label='Bebida'
              required
              data-cy={`${referral}-bebida-input`}
              CustomInput={
                <Select>
                  <option disabled selected></option>
                  {objectEntries(CoffeeBebidasLabel).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              }
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
