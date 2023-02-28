import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Center,
  Flex,
  Heading,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLeftIcon,
} from '@chakra-ui/react'
import { toast } from 'react-hot-toast'
import { IoWarningOutline } from 'react-icons/io5'
import { Navigate } from 'react-router-dom'
import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../shared/components/Page'
import SpinLoader from '../../../../shared/components/SpinLoader'
import { CheckingAccount, GeneralInfo } from './Tabs'
import useClientDetailsView from './useView'

export default function ClientDetails(): JSX.Element {
  const { client, isLoading, handleChangeTab, currentTab } = useClientDetailsView()

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
          <Tabs isLazy w='full' onChange={handleChangeTab} index={currentTab}>
            <Card overflow='auto' p={4} roundedTop={0} borderColor='inherit'>
              <TabList justifyContent='center' minW='max-content' w='full'>
                <Tab data-cy='checkingAccount-tab'>Conta Corrente</Tab>
                <Tab data-cy='coffe-tab'>Conta Café</Tab>
                <Tab data-cy='choice-tab'>Conta Escolha</Tab>
                <Tab data-cy='harvest-tab'>Conta Colheita</Tab>
                <Tab data-cy='sack-tab'>Conta Sacaria</Tab>
                <Tab data-cy='info-tab'>Informações Gerais</Tab>
              </TabList>
            </Card>
            <TabPanels>
              <TabPanel>
                <CheckingAccount />
              </TabPanel>
              <TabPanel>
                <InDevelopmentTag />
              </TabPanel>
              <TabPanel>
                <InDevelopmentTag />
              </TabPanel>
              <TabPanel>
                <InDevelopmentTag />
              </TabPanel>
              <TabPanel>
                <InDevelopmentTag />
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

// TODO - Remove this component once the tabs are implemented
function InDevelopmentTag(): JSX.Element {
  return (
    <Center>
      <Tag colorScheme='yellow'>
        <TagLeftIcon>
          <IoWarningOutline size={26} />
        </TagLeftIcon>
        Em desenvolvimento
      </Tag>
    </Center>
  )
}
