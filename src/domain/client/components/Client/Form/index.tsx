import { Button, Card, CardBody, Grid, GridItem, VStack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { validationErrors } from '../../../../../lib/errors'
import ControllerField from '../../../../../shared/components/inputs/ControllerField'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../../shared/components/inputs/RHFMaskInput'
import RHFSelectField from '../../../../../shared/components/inputs/RHFSelectField'
import RHFTextField from '../../../../../shared/components/inputs/RHFTextField'
import CaptureImage from './CaptureImage'
import PersonData from './PersonData'
import { type ClientFormValues } from './types'

const validationSchema = yup.object().shape({
  name: yup.string().required(validationErrors.nameIsRequired),
})

type ClientFormProps = {
  onSubmit: (values: ClientFormValues) => Promise<void>
  submitText: string
  defaultValues: ClientFormValues
}
export default function ClientForm({
  onSubmit,
  submitText,
  defaultValues,
}: ClientFormProps): JSX.Element {
  const formMethods = useForm<ClientFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  })
  const { register, setValue, formState, handleSubmit, control } = formMethods

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack align='stretch' spacing={10}>
          <CaptureImage />
          <Card boxShadow='2xl'>
            <CardBody>
              <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
                <GridItem>
                  <ControllerField
                    control={control}
                    name='name'
                    label='Nome'
                    placeholder='Nome do cliente'
                    data-cy='client-name-input'
                    required
                  />
                </GridItem>
                <GridItem>
                  <RHFField<ClientFormValues>
                    register={register}
                    name='nickname'
                    label='Apelido'
                    placeholder='Apelido do cliente'
                    data-cy='client-nickname-input'
                  />
                </GridItem>
                <GridItem>
                  <RHFMaskInput<ClientFormValues>
                    register={register}
                    name='contact.phone'
                    label='Telefone'
                    placeholder='(xx) xxxxx-xxxx'
                    mask='(00) 00000-0000'
                    type='tel'
                    setValue={(value) => {
                      setValue('contact.phone', value.match(/\d/g)?.join('') ?? '')
                    }}
                    data-cy='client-phone-input'
                  />
                </GridItem>
                <GridItem>
                  <RHFMaskInput<ClientFormValues>
                    register={register}
                    name='contact.secondaryPhone'
                    label='Telefone secundário'
                    placeholder='(xx) xxxxx-xxxx'
                    mask='(00) 00000-0000'
                    type='tel'
                    setValue={(value) => {
                      setValue('contact.secondaryPhone', value.match(/\d/g)?.join('') ?? '')
                    }}
                    data-cy='client-secondaryPhone-input'
                  />
                </GridItem>
                <GridItem>
                  <RHFSelectField<ClientFormValues>
                    name='personType.type'
                    label='Tipo de pessoa'
                    register={register}
                    options={[
                      { value: 'fisica', label: 'Física' },
                      { value: 'juridica', label: 'Jurídica' },
                    ]}
                    data-cy='client-person-type-input'
                  />
                </GridItem>
                <GridItem gridColumn='1/-1'>
                  <PersonData />
                </GridItem>

                <GridItem gridColumn='1/-1'>
                  <RHFTextField<ClientFormValues>
                    register={register}
                    name='description'
                    placeholder='Descrição do cliente'
                    data-cy='client-description-input'
                  />
                </GridItem>
              </Grid>
            </CardBody>
          </Card>
          <Button
            type='submit'
            isLoading={formState.isSubmitting}
            colorScheme='blue'
            data-cy='submit-button'
          >
            {submitText}
          </Button>
        </VStack>
      </form>
    </FormProvider>
  )
}
