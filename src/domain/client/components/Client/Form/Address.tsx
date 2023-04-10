import { Grid, GridItem } from '@chakra-ui/react'
import { type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import allStates from '../../../../../lib/constants/states.json'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../../shared/components/inputs/RHFMaskInput'
import RHFSelectField from '../../../../../shared/components/inputs/RHFSelectField'
import { type ClientFormValues } from './useClientForm'

type AddressFieldsProps = {
  register: UseFormRegister<ClientFormValues>
  setValue: UseFormSetValue<ClientFormValues>
}
export default function AddressFields({ register, setValue }: AddressFieldsProps): JSX.Element {
  return (
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.city'
          label='Cidade'
          placeholder='Cidade do cliente'
          data-cy='client-city-input'
        />
      </GridItem>
      <GridItem>
        <RHFMaskInput<ClientFormValues>
          register={register}
          name='address.zipCode'
          label='CEP'
          placeholder='CEP do cliente'
          mask='00000-000'
          setValue={(value) => {
            setValue('address.zipCode', value.match(/\d/g)?.join('') ?? '')
          }}
          data-cy='client-zipcode-input'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.street'
          label='Rua'
          placeholder='Rua do cliente'
          data-cy='client-street-input'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.number'
          label='Número'
          placeholder='Número da casa'
          type='number'
          data-cy='client-address-number-input'
        />
      </GridItem>
      <GridItem>
        <RHFSelectField<ClientFormValues>
          register={register}
          name='address.state'
          label='Estado'
          placeholder='Estado do cliente'
          options={allStates.UF.map((state) => ({ value: state.sigla, label: state.nome }))}
          data-cy='client-state-input'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.neighborhood'
          label='Bairro'
          placeholder='Bairro do cliente'
          data-cy='client-neighborhood-input'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.brook'
          label='Córrego'
          placeholder='Córrego do cliente'
          data-cy='client-brook-input'
        />
      </GridItem>
    </Grid>
  )
}
