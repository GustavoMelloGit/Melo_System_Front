import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
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
import { ClientFormValues } from './type'
import useClientForm from './useClientForm'

export default function ClientForm(): JSX.Element {
  const {
    form: { register, setValue, formState },
    handleSubmit,
  } = useClientForm()
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
              name='phone'
              label='Telefone'
              placeholder='Telefone do cliente'
              mask='(00) 00000-0000'
              type='tel'
              setValue={(value) => {
                setValue('phone', value.match(/\d/g)?.join('') ?? '')
              }}
            />
          </GridItem>
          <GridItem>
            <RHFSelectField<ClientFormValues>
              name='personType'
              label='Tipo de pessoa'
              register={register}
              options={[
                { value: 'fisica', label: 'Física' },
                { value: 'juridica', label: 'Jurídica' },
              ]}
            />
          </GridItem>
          <GridItem gridColumn='1/-1'>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Text flex={1} textAlign='left'>
                    Pessoa Física
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <RHFField<ClientFormValues>
                    register={register}
                    name='fatherName'
                    label='Nome do pai'
                    placeholder='Nome do pai do cliente'
                    errors={formState.errors}
                  />
                  <RHFField<ClientFormValues>
                    register={register}
                    name='motherName'
                    label='Nome da mãe'
                    placeholder='Nome da mãe do cliente'
                    errors={formState.errors}
                  />
                  <RHFField<ClientFormValues>
                    register={register}
                    name='birthDate'
                    label='Data de nascimento'
                    placeholder='Data de nascimento do cliente'
                    type={'date'}
                    errors={formState.errors}
                  />
                  <RHFMaskInput<ClientFormValues>
                    register={register}
                    name='cpf'
                    label='CPF'
                    placeholder='CPF do cliente'
                    mask='000.000.000-00'
                    errors={formState.errors}
                  />
                  <RHFField<ClientFormValues>
                    register={register}
                    name='rg'
                    label='RG'
                    placeholder='RG do cliente'
                    errors={formState.errors}
                  />
                  <RHFField<ClientFormValues>
                    register={register}
                    name='rgEmissionDate'
                    label='Data de emissão do RG'
                    placeholder='Data de emissão do RG do cliente'
                    type='date'
                    errors={formState.errors}
                  />
                  <RHFField<ClientFormValues>
                    register={register}
                    name='producerRegistration'
                    label='Inscrição de produtor'
                    placeholder='Inscrição de produtor do cliente'
                    errors={formState.errors}
                  />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Text flex={1} textAlign='left'>
                    Pessoa Jurídica
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <RHFMaskInput<ClientFormValues>
                    register={register}
                    name='cnpj'
                    label='CNPJ'
                    placeholder='CNPJ do cliente'
                    mask='00.000.000/0000-00'
                  />
                  <RHFField<ClientFormValues>
                    register={register}
                    name='stateRegistration'
                    label='Inscrição estadual'
                    placeholder='Inscrição estadual do cliente'
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridItem>
          <GridItem gridColumn='1/-1'>
            <RHFTextField<ClientFormValues>
              register={register}
              name='description'
              placeholder='Descrição do cliente'
            />
          </GridItem>
        </Grid>
        <Button type='submit' isLoading={formState.isSubmitting} colorScheme='blue'>
          Criar cliente
        </Button>
      </VStack>
    </form>
  )
}
