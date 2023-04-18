import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import InDevelopmentTag from '../../../../../shared/components/InDevelopmentTag'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SpinLoader from '../../../../../shared/components/SpinLoader'
import ListTransactionsView from '../Accounts/Checking/view/List'
import CoffeeAccountView from '../Accounts/Coffee/view/List'
import EscolhaAccountView from '../Accounts/Escolha/view/List'
import SacariaAccountView from '../Accounts/Sacaria/view/List'
import GeneralInfo from '../GeneralInfo'

import useClientDetailsView from './useView'

export default function ClientDetails(): JSX.Element {
  const { client, isLoading, currentTab } = useClientDetailsView()

  if (isLoading) return <SpinLoader />
  if (!client) {
    toast.error('Cliente não encontrado')
    return <Navigate to={Routes.clients} />
  }
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
      <Box>
        <Card roundedBottom={0}>
          <CardHeader pb={0}>
            <Stack flexDir={['column', 'row']} align={'center'} gap={8}>
              <Avatar size='2xl' loading='lazy' src={client.profileImage} name={client.name} />
              <Box textAlign={['center', 'left']}>
                <Heading as='h1' fontSize={['xl', '4xl']}>
                  {client.name}
                </Heading>
                <Heading size={['sm', 'md']} fontWeight={400} fontStyle='italic'>
                  ({client.nickname ?? 'Sem apelido'})
                </Heading>
              </Box>
            </Stack>
          </CardHeader>
        </Card>
        <Flex justify='center'>
          <Tabs isLazy w='full' index={currentTab}>
            <Card overflow='auto' p={4} roundedTop={0} borderColor='inherit'>
              <TabList justifyContent='center' minW='max-content' w='full'>
                <Link to='?tab=0' draggable={false}>
                  <Tab as='span' data-cy='checkingAccount-tab'>
                    Conta Corrente
                  </Tab>
                </Link>
                <Link to='?tab=1' draggable={false}>
                  <Tab as='span' data-cy='coffe-tab'>
                    Conta Café
                  </Tab>
                </Link>
                <Link to='?tab=2' draggable={false}>
                  <Tab as='span' data-cy='choice-tab'>
                    Conta Escolha
                  </Tab>
                </Link>
                <Link to='?tab=3' draggable={false}>
                  <Tab as='span' data-cy='harvest-tab'>
                    Conta Colheita
                  </Tab>
                </Link>
                <Link to='?tab=4' draggable={false}>
                  <Tab as='span' data-cy='sack-tab'>
                    Conta Sacaria
                  </Tab>
                </Link>
                <Link to='?tab=5' draggable={false}>
                  <Tab as='span' data-cy='info-tab'>
                    Informações Gerais
                  </Tab>
                </Link>
              </TabList>
            </Card>
            <TabPanels>
              <TabPanel>
                <ListTransactionsView />
              </TabPanel>
              <TabPanel>
                <CoffeeAccountView />
              </TabPanel>
              <TabPanel>
                <EscolhaAccountView />
              </TabPanel>
              <TabPanel>
                <InDevelopmentTag />
              </TabPanel>
              <TabPanel>
                <SacariaAccountView />
              </TabPanel>
              <TabPanel>
                <GeneralInfo client={client} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Page>
  )
}
