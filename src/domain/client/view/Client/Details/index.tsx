import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Center,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { BsZoomIn } from 'react-icons/bs'
import { Link, Navigate } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import IconButton from '../../../../../shared/components/IconButton'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import SpinLoader from '../../../../../shared/components/SpinLoader'
import ListTransactionsView from '../Accounts/Checking/view/List'
import CoffeeAccountView from '../Accounts/Coffee/view/List'
import EscolhaAccountView from '../Accounts/Escolha/view/List'
import FertilizerAccountView from '../Accounts/Fertilizer/view/List'
import SacariaAccountView from '../Accounts/Sacaria/view/List'
import useClientDetailsView from './useView'

enum ClientAccountsEnum {
  checking,
  coffee,
  escolha,
  bags,
  fertilizer,
}

export default function ClientDetails(): JSX.Element {
  const {
    client,
    isLoading,
    currentTab,
    openClientInfoModal,
    openClientBalancesModal,
    zoomClientImage,
  } = useClientDetailsView()

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
            <Flex
              align={'center'}
              flexDir={{
                base: 'column',
                sm: 'row',
              }}
              gap={[4, 8]}
              flexWrap='wrap'
            >
              <Box
                pos='relative'
                borderRadius='full'
                boxSize={{
                  base: '96px',
                  sm: '128px',
                }}
              >
                {client.profileImage && (
                  <Center
                    as='button'
                    opacity={0}
                    pos='absolute'
                    inset={0}
                    borderRadius='full'
                    background='rgba(0,0,0,0.5)'
                    transition='opacity 0.2s'
                    zIndex={1}
                    _hover={{
                      opacity: 1,
                    }}
                    onClick={() => {
                      zoomClientImage(client.profileImage ?? '')
                    }}
                  >
                    <BsZoomIn size={26} />
                  </Center>
                )}
                <Avatar
                  boxSize='full'
                  size={{ base: 'xl', sm: '2xl' }}
                  loading='lazy'
                  src={client.profileImage}
                  name={client.name}
                />
              </Box>
              <Flex
                justify='space-between'
                flex={1}
                flexDir={{
                  base: 'column',
                  sm: 'row',
                }}
                gap={6}
              >
                <Box
                  textAlign={{
                    base: 'center',
                    sm: 'left',
                  }}
                >
                  <Heading size={'xs'} mt={0.5} fontWeight={400}>
                    Cód.: {client.code}
                  </Heading>
                  <Heading as='h1' fontSize={['xl', '4xl']}>
                    {client.name}
                  </Heading>
                  <Heading size={['xs', 'md']} fontWeight={400} fontStyle='italic'>
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
                    icon='document'
                  />
                  <IconButton
                    onClick={openClientBalancesModal}
                    variant='outline'
                    title='Saldos do cliente'
                    aria-label='Saldos do cliente'
                    icon='circledDollar'
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
                <Link to={`?tab=${ClientAccountsEnum.checking}`} draggable={false}>
                  <Tab as='span' data-cy='checkingAccount-tab' roundedTop={6}>
                    Conta Corrente
                  </Tab>
                </Link>
                <Link to={`?tab=${ClientAccountsEnum.coffee}`} draggable={false}>
                  <Tab as='span' data-cy='coffe-tab' roundedTop={6}>
                    Conta Café
                  </Tab>
                </Link>
                <Link to={`?tab=${ClientAccountsEnum.escolha}`} draggable={false}>
                  <Tab as='span' data-cy='choice-tab' roundedTop={6}>
                    Conta Escolha
                  </Tab>
                </Link>
                {/* <Link to='?tab=3' draggable={false}>
                  <Tab as='span' data-cy='harvest-tab' roundedTop={6}>
                    Conta Colheita
                  </Tab>
                </Link> */}
                <Link to={`?tab=${ClientAccountsEnum.bags}`} draggable={false}>
                  <Tab as='span' data-cy='sack-tab' roundedTop={6}>
                    Conta Sacaria
                  </Tab>
                </Link>
                <Link to={`?tab=${ClientAccountsEnum.fertilizer}`} draggable={false}>
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
              {/* <TabPanel px={0}>
                <InDevelopmentTag />
              </TabPanel> */}
              <TabPanel px={0}>
                <SacariaAccountView />
              </TabPanel>
              <TabPanel px={0}>
                <FertilizerAccountView />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Box>
    </Page>
  )
}
