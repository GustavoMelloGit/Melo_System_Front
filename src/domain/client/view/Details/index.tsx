import { Avatar, Card, CardHeader, Heading, HStack, VStack } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import SpinLoader from '../../../../shared/components/SpinLoader'
import useClientDetailsView from './useView'

export default function ClientDetails(): JSX.Element {
  const { client, isLoading } = useClientDetailsView()

  if (isLoading || !client) return <SpinLoader />
  return (
    <Page title={client.name}>
      <HeaderBreadcrumbs
        heading='Clientes'
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          {
            label: client.name,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <HStack spacing={4}>
            <Avatar size='2xl' loading='lazy' src={client.profileImage} name={client.name} />
            <VStack align='flex-start'>
              <Heading as='h1'>{client.name}</Heading>
              <Heading size='md' fontWeight={500}>
                {client.nickname}
              </Heading>
            </VStack>
          </HStack>
        </CardHeader>
      </Card>
    </Page>
  )
}
