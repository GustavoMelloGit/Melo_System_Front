import { Box, Divider, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { type ClientModel } from '../../../../types/model/Client'

type ClientInfo = Array<{ label: string; value: React.ReactNode }>
type GeneralInfoProps = {
  client: ClientModel
}

const defaultEmptyValue = '--'
export default function GeneralInfo({ client }: GeneralInfoProps): JSX.Element {
  const isLegalPerson = client.personType?.type === 'juridica'

  const clientInfo = useMemo(
    () => ({
      generalInfo: [
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
        {
          label: 'Descrição',
          value: client.description ?? defaultEmptyValue,
        },
      ],
      address: [
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
      ],
      ...(client.personType?.type === 'juridica' && {
        legalPerson: [
          {
            label: 'CNPJ',
            value: client.personType.cnpj ?? defaultEmptyValue,
          },
          {
            label: 'Inscrição estadual',
            value: client.personType.stateRegistration ?? defaultEmptyValue,
          },
        ],
      }),
      ...(client.personType?.type === 'fisica' && {
        naturalPerson: [
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
          {
            label: 'Data de nascimento',
            value: client.personType.birthDate
              ? new Date(client.personType.birthDate).toLocaleDateString('pt-BR')
              : defaultEmptyValue,
          },
        ],
      }),
    }),
    [client],
  )

  return (
    <VStack align='flex-start' spacing={10} mt={6} id='screenshot-content'>
      <DisplayInfoBox title='Geral' data={clientInfo.generalInfo} />

      {!isLegalPerson && (
        <DisplayInfoBox title='Pessoa Física' data={clientInfo.naturalPerson ?? []} />
      )}

      {isLegalPerson && (
        <DisplayInfoBox title='Pessoa Jurídica' data={clientInfo.legalPerson ?? []} />
      )}

      <DisplayInfoBox title='Endereço' data={clientInfo.address} />
    </VStack>
  )
}

function DisplayInfoBox({ data, title }: { data: ClientInfo; title?: string }): JSX.Element {
  return (
    <>
      {title && (
        <VStack align={['center', 'flex-start']} w='full'>
          <Heading as='h2' fontSize='3xl'>
            {title}
          </Heading>
          <Divider />
        </VStack>
      )}
      <Grid gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))' w='full' gap={6}>
        {data.map(({ label, value }) => (
          <GridItem key={label}>
            <Box textAlign={['center', 'start']}>
              <Heading as='h3' fontSize='lg'>
                {label}
              </Heading>
              <Text>{value}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}
