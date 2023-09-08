import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react'
import { type ReactNode } from 'react'
import IconButton from '../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { type UserRole } from '../../../auth/types/model/user'
import useUsersView from './useView'

const labelByRole: Record<UserRole, string> = {
  admin: 'Administrador',
  user: 'Usuário',
}

export default function UsersView(): JSX.Element {
  const { clients, handleAddUser } = useUsersView()

  return (
    <Page title='Usuários'>
      <Container maxW={500}>
        <HeaderBreadcrumbs
          heading='Usuários'
          links={[
            {
              label: 'Usuários do sistema',
            },
          ]}
          actions={
            <IconButton
              aria-label='Adicionar usuário'
              icon='add'
              colorScheme='blue'
              variant='outline'
              data-cy='add-users-button'
              title='Adicionar usuário'
              onClick={handleAddUser}
            />
          }
        />
        <Stack as='main' mt={10} divider={<Divider />} spacing={3}>
          <Accordion allowToggle>
            {clients.map((client) => (
              <AccordionItem key={client.id}>
                <AccordionButton>
                  <Text as='span' fontSize='lg' textAlign='left' flex={1}>
                    {client.name}
                  </Text>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel fontSize='sm'>
                  <InfoBox label='Nome' value={client.name} />
                  <InfoBox label='Apelido' value={client.nickname} />
                  <InfoBox label='Permissão' value={labelByRole[client.role]} />
                  <InfoBox label='ID' value={client.id} />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Stack>
      </Container>
    </Page>
  )
}

type InfoProps = {
  label: ReactNode
  value: ReactNode
}
function InfoBox({ label, value }: InfoProps): JSX.Element {
  return (
    <Flex justify='space-between' align='center'>
      <Text>{label}</Text>
      <Text fontWeight={700} textAlign='right'>
        {value}
      </Text>
    </Flex>
  )
}
