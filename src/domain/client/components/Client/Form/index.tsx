import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import AvatarDropzone from '../../../../../shared/components/inputs/AvatarDropzone'
import RHFField from '../../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../../shared/components/inputs/RHFMaskInput'
import RHFSelectField from '../../../../../shared/components/inputs/RHFSelectField'
import RHFTextField from '../../../../../shared/components/inputs/RHFTextField'
import AddressFields from './Address'
import LegalPersonFields from './LegalPerson'
import NaturalPersonFields from './NaturalPerson'
import useClientForm, { type ClientFormValues } from './useClientForm'

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
  const {
    form: { register, setValue, formState, watch, handleSubmit, control },
  } = useClientForm({ defaultValues })
  const isLegalPerson = watch('personType.type') === 'juridica'
  const formHasErrors = Object.keys(formState.errors).length > 0
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align='stretch' spacing={10}>
        <Flex justify='center'>
          <AvatarDropzone
            onDrop={(image) => {
              setValue('profileImage', image)
            }}
            currentSrc={watch('profileImage')}
          />
        </Flex>
        <Card boxShadow='2xl'>
          <CardBody>
            <Grid templateColumns='repeat(auto-fit, minmax(200px, 1fr))' gap={4}>
              <GridItem>
                <RHFField<ClientFormValues>
                  register={register}
                  errors={formState.errors}
                  name='name'
                  label='Nome'
                  placeholder='Nome do cliente'
                  data-cy='client-name-input'
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
                  placeholder='Telefone do cliente'
                  mask='(00) 00000-0000'
                  type='tel'
                  setValue={(value) => {
                    setValue('contact.phone', value.match(/\d/g)?.join('') ?? '')
                  }}
                  data-cy='client-phone-input'
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
                <VStack align='stretch'>
                  <Accordion allowToggle index={formHasErrors ? 0 : undefined}>
                    <AccordionItem border='none'>
                      <AccordionButton data-cy='address-accordion' pl={0}>
                        <AccordionIcon />
                        <Text flex={1} fontWeight={700} textAlign='left'>
                          Endereço
                        </Text>
                      </AccordionButton>
                      <AccordionPanel>
                        <AddressFields setValue={setValue} register={register} />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Accordion allowToggle index={formHasErrors ? 0 : undefined}>
                    <AccordionItem border='none'>
                      <AccordionButton pl={0} data-cy='client-personType-accordion'>
                        <AccordionIcon />
                        <Text flex={1} fontWeight={700} textAlign='left'>
                          {isLegalPerson ? 'Dados da empresa' : 'Dados pessoais'}
                        </Text>
                      </AccordionButton>
                      <AccordionPanel>
                        {isLegalPerson ? (
                          <LegalPersonFields register={register} formState={formState} />
                        ) : (
                          <NaturalPersonFields
                            control={control}
                            setValue={setValue}
                            register={register}
                            formState={formState}
                          />
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </VStack>
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
  )
}
