import { Flex, Select, Stack } from '@chakra-ui/react'
import { useWatch, type Control } from 'react-hook-form'
import { GiChipsBag } from 'react-icons/gi'
import ControllerField from '../../../../../../shared/components/inputs/ControllerField'
import RHFCurrencyInput from '../../../../../../shared/components/inputs/RHFCurrencyInput'
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
  const type = useWatch({
    control,
    name: `${referral}.transferType`,
  })
  return (
    <Stack spacing={4}>
      <Flex gap={2}>
        <ControllerField
          control={control}
          name={`${referral}.transferType`}
          label='Tipo de transferência'
          CustomInput={
            <Select>
              <option value='coffee'>Café</option>
              <option value='currency'>Dinheiro</option>
            </Select>
          }
        />
        {type === 'currency' && (
          <RHFCurrencyInput
            control={control}
            name={`${referral}.value`}
            label={valueLabelByReferral[referral]}
          />
        )}
      </Flex>
      {type === 'coffee' && (
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
