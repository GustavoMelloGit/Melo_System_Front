import { Grid, GridItem } from '@chakra-ui/react'
import { UseFormRegister } from 'react-hook-form'
import RHFField from '../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../shared/components/inputs/RHFMaskInput'
import { ClientFormValues } from './type'

type AddressFieldsProps = {
  register: UseFormRegister<ClientFormValues>
}
export default function AddressFields({ register }: AddressFieldsProps): JSX.Element {
  return (
    <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.city'
          label='Cidade'
          placeholder='Cidade do cliente'
        />
      </GridItem>
      <GridItem>
        <RHFMaskInput<ClientFormValues>
          register={register}
          name='address.zipCode'
          label='CEP'
          placeholder='CEP do cliente'
          mask='00000-000'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.street'
          label='Rua'
          placeholder='Rua do cliente'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.number'
          label='Número'
          placeholder='Número da casa'
          type='number'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.state'
          label='Estado'
          placeholder='Estado do cliente'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.neighborhood'
          label='Bairro'
          placeholder='Bairro do cliente'
        />
      </GridItem>
      <GridItem>
        <RHFField<ClientFormValues>
          register={register}
          name='address.brook'
          label='Córrego'
          placeholder='Córrego do cliente'
        />
      </GridItem>
    </Grid>
  )
}
