import { Box, Divider, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'
import { type ClientModel } from '../../../../types/model/Client'

type ClientInfo = Array<{ label: string; value: React.ReactNode }>
type GeneralInfoProps = {
  client: ClientModel
}

const defaultEmptyValue = '--'
export default function GeneralInfo({ client }: GeneralInfoProps): JSX.Element {
  const isLegalPerson = client.personType?.type === 'juridica'
  const naturalPersonInfo: ClientInfo = !isLegalPerson
    ? [
        {
          label: 'CPF',
          value: client.personType.cpf ?? defaultEmptyValue,
        },
        {
          label: 'RG',
          value: client.personType.rg ?? defaultEmptyValue,
        },
        {
          label: 'Data de emissão do RG',
          value: client.personType.rgEmissionDate
            ? new Date(client.personType.rgEmissionDate).toLocaleDateString('pt-BR')
            : defaultEmptyValue,
        },
        {
          label: 'Inscrição de produtor',
          value: client.personType.producerRegistration ?? defaultEmptyValue,
        },
      ]
    : []

  const legalPersonInfo: ClientInfo = isLegalPerson
    ? [
        {
          label: 'CNPJ',
          value: client.personType.cnpj ?? defaultEmptyValue,
        },
        {
          label: 'Inscrição estadual',
          value: client.personType.stateRegistration ?? defaultEmptyValue,
        },
      ]
    : []

  const addressInfo: ClientInfo = [
    {
      label: 'CEP',
      value: client.address?.zipCode ?? defaultEmptyValue,
    },
    {
      label: 'Logradouro',
      value: client.address?.street ?? defaultEmptyValue,
    },
    {
      label: 'Número',
      value: client.address?.number ?? defaultEmptyValue,
    },
    {
      label: 'Complemento',
      value: client.address?.complement ?? defaultEmptyValue,
    },
    {
      label: 'Bairro',
      value: client.address?.neighborhood ?? defaultEmptyValue,
    },
    {
      label: 'Cidade',
      value: client.address?.city ?? defaultEmptyValue,
    },
    {
      label: 'Estado',
      value: client.address?.state ?? defaultEmptyValue,
    },
    {
      label: 'Córrego',
      value: client.address?.brook ?? defaultEmptyValue,
    },
  ]

  const clientInfo: ClientInfo = [
    {
      label: 'Nome',
      value: client.name,
    },
    {
      label: 'Apelido',
      value: client.nickname ?? defaultEmptyValue,
    },
    {
      label: 'Telefone',
      value: client.contact?.phone ?? defaultEmptyValue,
    },
    {
      label: 'Data de nascimento',
      value: client.birthDate
        ? new Date(client.birthDate).toLocaleDateString('pt-BR')
        : defaultEmptyValue,
    },
    {
      label: 'Descrição',
      value: client.description ?? defaultEmptyValue,
    },

    {
      label: 'Tipo de pessoa',
      value: client.personType?.type,
    },
    {
      label: 'Criado em',
      value: new Date(client.createdAt).toLocaleDateString('pt-BR'),
    },
    {
      label: 'Atualizado em',
      value: new Date(client.updatedAt).toLocaleDateString('pt-BR'),
    },
  ]

  return (
    <VStack align='flex-start' spacing={10} mt={6}>
      <Grid gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' w='full' gap={4}>
        {clientInfo.map((info) => (
          <GridItem key={info.label}>
            <DisplayInfoBox title={info.label} value={info.value} />
          </GridItem>
        ))}
      </Grid>

      {!isLegalPerson && (
        <>
          <VStack align='flex-start' w='full'>
            <Heading as='h2' fontSize='3xl'>
              Pessoa Física
            </Heading>
            <Divider />
          </VStack>
          <Grid gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' w='full' gap={4}>
            {naturalPersonInfo.map((info) => (
              <GridItem key={info.label}>
                <DisplayInfoBox title={info.label} value={info.value} />
              </GridItem>
            ))}
          </Grid>
        </>
      )}

      {isLegalPerson && (
        <>
          <VStack align='flex-start' w='full'>
            <Heading as='h2' fontSize='3xl'>
              Pessoa Jurídica
            </Heading>
            <Divider />
          </VStack>
          <Grid gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' w='full' gap={4}>
            {legalPersonInfo.map((info) => (
              <GridItem key={info.label}>
                <DisplayInfoBox title={info.label} value={info.value} />
              </GridItem>
            ))}
          </Grid>
        </>
      )}

      <VStack align='flex-start' w='full'>
        <Heading as='h2' fontSize='3xl'>
          Endereço
        </Heading>
        <Divider />
      </VStack>
      <Grid gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))' w='full' gap={4}>
        {addressInfo.map((info) => (
          <GridItem key={info.label}>
            <DisplayInfoBox title={info.label} value={info.value} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  )
}

function DisplayInfoBox({ title, value }: { title: string; value: React.ReactNode }): JSX.Element {
  return (
    <Box>
      <Heading as='h3' fontSize='lg'>
        {title}
      </Heading>
      <Text>{value}</Text>
    </Box>
  )
}
