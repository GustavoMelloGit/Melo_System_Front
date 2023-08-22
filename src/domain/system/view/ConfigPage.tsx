import { Container, Divider, Stack } from '@chakra-ui/react'
import HeaderBreadcrumbs from '../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../shared/components/Page'
import AddUser from '../components/ConfigPage/AddUser'
import ChangeLayout from '../components/ConfigPage/ChangeLayout'
import ChangeLockScreenTime from '../components/ConfigPage/ChangeLockScreenTime'
import ChangeTheme from '../components/ConfigPage/ChangeTheme'

export default function ConfigPage(): JSX.Element {
  return (
    <Page title='Configurações'>
      <Container maxW={500}>
        <HeaderBreadcrumbs
          heading='Configurações'
          links={[
            {
              label: 'Configurações do sistema',
            },
          ]}
        />
        <Stack as='main' mt={10} divider={<Divider />} spacing={3}>
          <ChangeTheme />
          <ChangeLayout />
          <ChangeLockScreenTime />
          <AddUser />
        </Stack>
      </Container>
    </Page>
  )
}
