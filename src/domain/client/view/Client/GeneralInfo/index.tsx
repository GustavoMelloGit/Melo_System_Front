import {
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { dateToFormat } from '../../../../../lib/utils/formatters'
import { useModal } from '../../../../../shared/hooks/useModal'
import { type ClientModel } from '../../../types/model/Client'

type ClientInfo = Array<{ label: string; value: React.ReactNode }>
type GeneralInfoProps = {
  client: ClientModel
}

const defaultEmptyValue = '--'
export default function GeneralInfo({ client }: GeneralInfoProps): JSX.Element {
  const closeModal = useModal((state) => state.closeModal)
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
          value: client.nickname,
        },
        {
          label: 'Telefone',
          value: client.contact?.phone,
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
          value: client.description,
        },
      ],
      address: [
        {
          label: 'CEP',
          value: client.address?.zipCode,
        },
        {
          label: 'Logradouro',
          value: client.address?.street,
        },
        {
          label: 'Número',
          value: client.address?.number,
        },
        {
          label: 'Complemento',
          value: client.address?.complement,
        },
        {
          label: 'Bairro',
          value: client.address?.neighborhood,
        },
        {
          label: 'Cidade',
          value: client.address?.city,
        },
        {
          label: 'Estado',
          value: client.address?.state,
        },
        {
          label: 'Córrego',
          value: client.address?.brook,
        },
      ],
      ...(client.personType?.type === 'juridica' && {
        legalPerson: [
          {
            label: 'CNPJ',
            value: client.personType.cnpj,
          },
          {
            label: 'Inscrição estadual',
            value: client.personType.stateRegistration,
          },
        ],
      }),
      ...(client.personType?.type === 'fisica' && {
        naturalPerson: [
          {
            label: 'CPF',
            value: client.personType.cpf,
          },
          {
            label: 'RG',
            value: client.personType.rg,
          },
          {
            label: 'Data de emissão do RG',
            value: client.personType.rgEmissionDate
              ? dateToFormat(client.personType.rgEmissionDate)
              : defaultEmptyValue,
          },
          {
            label: 'Inscrição de produtor',
            value: client.personType.producerRegistration,
          },
          {
            label: 'Data de nascimento',
            value: client.personType.birthDate
              ? dateToFormat(client.personType.birthDate)
              : defaultEmptyValue,
          },
          {
            label: 'Nome do pai',
            value: client.personType.fatherName,
          },
          {
            label: 'Nome da mãe',
            value: client.personType.motherName,
          },
        ],
      }),
    }),
    [client],
  )

  return (
    <Modal isCentered isOpen onClose={closeModal}>
      <ModalOverlay />
      <ModalContent
        w='full'
        maxW={1200}
        maxH={{
          base: 'calc(100vh - 4rem)',
          md: 'calc(100vh - 8rem)',
        }}
      >
        <ModalCloseButton zIndex={2} />
        <ModalBody pt={3} px={6} overflowY='auto'>
          <Stack align='flex-start' spacing={5} id='screenshot-content'>
            <DisplayInfoBox title='Geral' data={clientInfo.generalInfo} />

            {!isLegalPerson && (
              <DisplayInfoBox title='Pessoa Física' data={clientInfo.naturalPerson ?? []} />
            )}

            {isLegalPerson && (
              <DisplayInfoBox title='Pessoa Jurídica' data={clientInfo.legalPerson ?? []} />
            )}

            <DisplayInfoBox title='Endereço' data={clientInfo.address} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
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
      <Grid gridTemplateColumns='repeat(auto-fit, minmax(150px, 1fr))' w='full' gap={2}>
        {data.map(({ label, value }) => (
          <GridItem key={label}>
            <Box textAlign={['center', 'start']}>
              <Heading as='h3' fontSize='lg'>
                {label}
              </Heading>
              <Text>{value ?? defaultEmptyValue}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}
