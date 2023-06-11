import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { lazy } from 'react'
import { toast } from 'react-hot-toast'
import { BiDollarCircle } from 'react-icons/bi'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { Link, Navigate } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import InDevelopmentTag from '../../../../../shared/components/InDevelopmentTag'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SpinLoader from '../../../../../shared/components/SpinLoader'
import useClientDetailsView from './useView'
const SacariaAccountView = lazy(async () => import('../Accounts/Sacaria/view/List'))
const AduboAccountView = lazy(async () => import('../Accounts/Fertilizer/view/List'))
const EscolhaAccountView = lazy(async () => import('../Accounts/Escolha/view/List'))
const CoffeeAccountView = lazy(async () => import('../Accounts/Coffee/view/List'))
const ListTransactionsView = lazy(async () => import('../Accounts/Checking/view/List'))

export default function ClientDetails(): JSX.Element {
  const { client, isLoading, currentTab, openClientInfoModal, openClientBalancesModal } =
    useClientDetailsView()

  if (isLoading) return <SpinLoader />
  if (!client) {
    toast.error('Cliente não encossntrado')
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
            <Flex
              align={'center'}
              flexDir={{
                base: 'column',
                sm: 'row',
              }}
              gap={[4, 8]}
              flexWrap='wrap'
            >
              <Avatar
                size={{ base: 'xl', sm: '2xl' }}
                loading='lazy'
                src={client.profileImage}
                name={client.name}
              />
              <Flex
                justify='space-between'
                flex={1}
                flexDir={{
                  base: 'column',
                  sm: 'row',
                }}
                gap={2}
              >
                <Box
                  textAlign={{
                    base: 'center',
                    sm: 'left',
                  }}
                >
                  <Heading as='h1' fontSize={['xl', '4xl']}>
                    {client.name}
                  </Heading>
                  <Heading size={['sm', 'md']} fontWeight={400} fontStyle='italic'>
                    ({client.nickname ?? 'Sem apelido'})
                  </Heading>
                </Box>
                <Flex
                  gap={2.5}
                  align='center'
                  justify={{
                    base: 'center',
                    sm: 'flex-start',
                  }}
                >
                  <IconButton
                    onClick={openClientInfoModal}
                    variant='outline'
                    title='Informações gerais do cliente'
                    aria-label='Informações gerais do cliente'
                    icon={<IoDocumentTextOutline size={20} />}
                  />
                  <IconButton
                    onClick={openClientBalancesModal}
                    variant='outline'
                    title='Saldos do cliente'
                    aria-label='Saldos do cliente'
                    icon={<BiDollarCircle size={20} />}
                  />
                </Flex>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>
        <Flex justify='center'>
          <Tabs isLazy w='full' index={currentTab}>
            <Card overflow='auto' p={4} roundedTop={0} borderColor='inherit'>
              <TabList justifyContent='center' minW='max-content' w='full'>
                <Link to='?tab=0' draggable={false}>
                  <Tab as='span' data-cy='checkingAccount-tab' roundedTop={6}>
                    Conta Corrente
                  </Tab>
                </Link>
                <Link to='?tab=1' draggable={false}>
                  <Tab as='span' data-cy='coffe-tab' roundedTop={6}>
                    Conta Café
                  </Tab>
                </Link>
                <Link to='?tab=2' draggable={false}>
                  <Tab as='span' data-cy='choice-tab' roundedTop={6}>
                    Conta Escolha
                  </Tab>
                </Link>
                <Link to='?tab=3' draggable={false}>
                  <Tab as='span' data-cy='harvest-tab' roundedTop={6}>
                    Conta Colheita
                  </Tab>
                </Link>
                <Link to='?tab=4' draggable={false}>
                  <Tab as='span' data-cy='sack-tab' roundedTop={6}>
                    Conta Sacaria
                  </Tab>
                </Link>
                <Link to='?tab=5' draggable={false}>
                  <Tab as='span' data-cy='sack-tab' roundedTop={6}>
                    Conta Adubo
                  </Tab>
                </Link>
              </TabList>
            </Card>
            <TabPanels>
              <TabPanel px={0}>
                <ListTransactionsView />
              </TabPanel>
              <TabPanel px={0}>
                <CoffeeAccountView />
              </TabPanel>
              <TabPanel px={0}>
                <EscolhaAccountView />
              </TabPanel>
              <TabPanel px={0}>
                <InDevelopmentTag />
              </TabPanel>
              <TabPanel px={0}>
                <SacariaAccountView />
              </TabPanel>
              <TabPanel px={0}>
                <AduboAccountView />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Page>
  )
}
