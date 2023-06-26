import { Flex, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react'
import { Controller, useFormContext, useWatch, type Control } from 'react-hook-form'
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

type Props = {
  control: Control<ClientTransferFormValues, any>
  referral: Referral
}
export default function TransferReferralTransferTypeFields({
  control,
  referral,
}: Props): JSX.Element {
  const { setValue, register } = useFormContext<ClientTransferFormValues>()
  const type = useWatch({
    control,
    name: `${referral}.transferType`,
  })
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
                rounded='xl'
                variant={'filled'}
                onChange={(e) => {
                  onChange(e)
                  if (referral === 'from') {
                    setValue(`to.transferType`, e.target.value as 'currency' | 'coffee')
                  }
                }}
                id={field.name}
                {...field}
              >
                <option value='currency'>Dinheiro</option>
                <option value='coffee'>Café</option>
              </Select>
            </FormControl>
          )}
        />
        {type === 'currency' && (
          <RHFCurrencyInput
            control={control}
            leftIcon='R$'
            name={`${referral}.value`}
            label={valueLabelByReferral[referral]}
            onChangeValue={(value) => {
              if (referral === 'from' && typeof value !== 'undefined') {
                setValue(`to.value`, value)
              }
            }}
          />
        )}
      </Flex>
      {type === 'coffee' && (
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
