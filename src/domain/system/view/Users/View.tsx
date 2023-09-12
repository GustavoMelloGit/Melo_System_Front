import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Fade,
  Flex,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { isEmptyObject } from '../../../../lib/utils/isEmptyObject'
import IconButton from '../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import { type UserModel, type UserRole } from '../../../auth/types/model/user'
import { type Permission } from '../../types/Permission'

const labelByRole: Record<UserRole, string> = {
  admin: 'Administrador',
  user: 'Usuário',
}

type Props = {
  handleAddUser: () => void
  users: UserModel[]
  permissions: Permission[]
}
export default function UsersView({ handleAddUser, users, permissions }: Props): JSX.Element {
  const {
    control,
    formState: { dirtyFields },
    handleSubmit,
  } = useForm()

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
            <form onSubmit={handleSubmit(console.log)}>
              {users.map((user) => (
                <AccordionItem key={user.id}>
                  <AccordionButton>
                    <Text as='span' fontSize='lg' textAlign='left' flex={1}>
                      {user.name}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel fontSize='sm'>
                    <InfoBox label='Nome' value={user.name} />
                    <InfoBox label='Apelido' value={user.nickname} />
                    <InfoBox label='Permissão' value={labelByRole[user.role]} />
                    <InfoBox label='ID' value={user.id} />
                    <Divider my={2} />
                    <Stack>
                      {permissions.map((permission) => (
                        <InfoBox
                          key={permission.route}
                          label={permission.description}
                          value={
                            <Controller
                              control={control}
                              name={`user.${user.id}.${permission.route}`}
                              render={({ field: { onChange, ...field } }) => (
                                <Switch
                                  onChange={(e) => {
                                    onChange(e.target.checked)
                                  }}
                                  {...field}
                                />
                              )}
                            />
                          }
                        />
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
              <Box pos='sticky' bottom={0} left={0} width='full' pb={8}>
                <Center
                  as={Fade}
                  in={isEmptyObject(dirtyFields)}
                  bg={'rgba(26,32,44,0.7)'}
                  backdropFilter='blur(4px)'
                  rounded='xl'
                  color='white'
                  mt='4'
                  gap={4}
                  py={3}
                  px={4}
                  shadow='2xl'
                  justifyContent='space-between'
                >
                  <Text fontWeight='bold'>Deseja salvar as alterações?</Text>
                  <Flex gap={4}>
                    <Button variant='link' size='sm' type='reset' color='white' fontWeight='light'>
                      Cancelar
                    </Button>
                    <Button type='submit' colorScheme='green' size='sm'>
                      Salvar
                    </Button>
                  </Flex>
                </Center>
              </Box>
            </form>
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
