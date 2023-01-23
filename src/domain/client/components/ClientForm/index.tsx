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
import AvatarDropzone from '../../../../shared/components/inputs/AvatarDropzone'
import RHFField from '../../../../shared/components/inputs/RHFField'
import RHFMaskInput from '../../../../shared/components/inputs/RHFMaskInput'
import RHFSelectField from '../../../../shared/components/inputs/RHFSelectField'
import RHFTextField from '../../../../shared/components/inputs/RHFTextField'
import AddressFields from './Address'
import LegalPersonFields from './LegalPerson'
import NaturalPersonFields from './NaturalPerson'
import { ClientFormValues } from './type'
import useClientForm from './useClientForm'

export default function ClientForm(): JSX.Element {
  const {
    form: { register, setValue, formState, watch },
    handleSubmit,
  } = useClientForm()

  const isLegalPerson = watch('personType.personType') === 'juridica'

  const formHasErrors = Object.keys(formState.errors).length > 0
  return (
    <form onSubmit={handleSubmit}>
      <VStack align='stretch' spacing={10}>
        <Flex justify='center'>
          <AvatarDropzone
            onDrop={(image) => {
              setValue('profileImage', image)
            }}
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
                />
              </GridItem>
              <GridItem>
                <RHFField<ClientFormValues>
                  register={register}
                  name='nickname'
                  label='Apelido'
                  placeholder='Apelido do cliente'
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
                />
              </GridItem>
              <GridItem>
                <RHFSelectField<ClientFormValues>
                  name='personType.personType'
                  label='Tipo de pessoa'
                  register={register}
                  options={[
                    { value: 'fisica', label: 'Física' },
                    { value: 'juridica', label: 'Jurídica' },
                  ]}
                />
              </GridItem>
              <GridItem gridColumn='1/-1'>
                <VStack align='stretch'>
                  <Accordion allowToggle index={formHasErrors ? 0 : undefined}>
                    <AccordionItem border='none'>
                      <AccordionButton pl={0}>
                        <AccordionIcon />
                        <Text flex={1} fontWeight={700} textAlign='left'>
                          Endereço
                        </Text>
                      </AccordionButton>
                      <AccordionPanel>
                        <AddressFields register={register} />
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Accordion allowToggle index={formHasErrors ? 0 : undefined}>
                    <AccordionItem border='none'>
                      <AccordionButton pl={0}>
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
                />
              </GridItem>
            </Grid>
          </CardBody>
        </Card>
        <Button type='submit' isLoading={formState.isSubmitting} colorScheme='blue'>
          Criar cliente
        </Button>
      </VStack>
    </form>
  )
}
