import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { BsZoomIn } from 'react-icons/bs'
import { Navigate } from 'react-router-dom'
import { Routes } from '../../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Link from '../../../../../shared/components/Link'
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

  const linkStyle = {
    textDecoration: 'none',
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
                  w='full'
                >
                  <Flex
                    mt={0.5}
                    fontSize={{
                      base: 'xs',
                      sm: 'sm',
                    }}
                    justify='space-between'
                    flexDir={{
                      base: 'column',
                      sm: 'row',
                    }}
                    align='center'
                    flexWrap='wrap'
                    gap={{
                      base: 1,
                      sm: 4,
                    }}
                    mb={{
                      base: 1,
                      sm: 0,
                    }}
                  >
                    <Heading fontSize='inherit' color='white' fontWeight={400}>
                      Cód.: {client.code}{' '}
                    </Heading>
                    <HStack
                      divider={<Divider orientation='vertical' h={4} />}
                      align='center'
                      fontWeight={600}
                      gap={{
                        base: 1,
                        sm: 2,
                      }}
                      color='blue.500'
                      flexWrap='wrap'
                    >
                      <Link to={Routes.clientPickups(client.id)}>Cafés a buscar</Link>
                      <Link to={Routes.clientSheets(client.id)}>Folhas</Link>
                      <Button
                        onClick={openClientInfoModal}
                        variant='link'
                        color='inherit'
                        fontSize='inherit'
                      >
                        Detalhes
                      </Button>
                      <Button
                        onClick={openClientBalancesModal}
                        variant='link'
                        color='inherit'
                        fontSize='inherit'
                      >
                        Saldos
                      </Button>
                    </HStack>
                  </Flex>
                  <Heading as='h1' fontSize={['xl', '3xl']}>
                    {client.name}
                  </Heading>
                  <Heading fontSize={['xs', 'md']} fontWeight={400} fontStyle='italic'>
                    ({client.nickname ?? 'Sem apelido'})
                  </Heading>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
        </Card>
        <Flex justify='center'>
          <Tabs isLazy w='full' index={currentTab}>
            <Card overflow='auto' p={4} roundedTop={0} borderColor='inherit'>
              <TabList justifyContent='center' minW='max-content' w='full'>
                <Link
                  style={linkStyle}
                  to={`?tab=${ClientAccountsEnum.checking}`}
                  draggable={false}
                >
                  <Tab as='span' data-cy='checkingAccount-tab' roundedTop={6}>
                    Conta Corrente
                  </Tab>
                </Link>
                <Link style={linkStyle} to={`?tab=${ClientAccountsEnum.coffee}`} draggable={false}>
                  <Tab as='span' data-cy='coffe-tab' roundedTop={6}>
                    Conta Café
                  </Tab>
                </Link>
                <Link style={linkStyle} to={`?tab=${ClientAccountsEnum.escolha}`} draggable={false}>
                  <Tab as='span' data-cy='choice-tab' roundedTop={6}>
                    Conta Escolha
                  </Tab>
                </Link>
                {/* <Link to='?tab=3' draggable={false}>
                  <Tab as='span' data-cy='harvest-tab' roundedTop={6}>
                    Conta Colheita
                  </Tab>
                </Link> */}
                <Link style={linkStyle} to={`?tab=${ClientAccountsEnum.bags}`} draggable={false}>
                  <Tab as='span' data-cy='sack-tab' roundedTop={6}>
                    Conta Sacaria
                  </Tab>
                </Link>
                <Link
                  style={linkStyle}
                  to={`?tab=${ClientAccountsEnum.fertilizer}`}
                  draggable={false}
                >
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
