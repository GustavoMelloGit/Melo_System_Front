import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { IoDocumentTextOutline } from 'react-icons/io5'
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

import useClientDetailsView from './useView'

export default function ClientDetails(): JSX.Element {
  const { client, isLoading, currentTab, openClientInfoModal } = useClientDetailsView()

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
                <Flex align='center' gap={1}>
                  <Heading size={['sm', 'md']} fontWeight={400} fontStyle='italic'>
                    ({client.nickname ?? 'Sem apelido'})
                  </Heading>
                  <IconButton
                    onClick={openClientInfoModal}
                    variant='ghost'
                    title='Informações gerais do cliente'
                    aria-label='Informações gerais do cliente'
                    icon={<IoDocumentTextOutline size={20} />}
                  />
                </Flex>
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
              </TabList>
            </Card>
            <TabPanels>
              <TabPanel>
                <ListTransactionsView />
              </TabPanel>
              <TabPanel px={0}>
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
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Page>
  )
}
