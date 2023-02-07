import {
  Avatar,
  Box,
  Card,
  CardBody,
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
import { IoWarningOutline } from 'react-icons/io5'
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
        <CardBody pt={0}>
          <Flex justify='center'>
            <Tabs isLazy w='full'>
              <Box overflow='auto'>
                <TabList justifyContent='center' minW='max-content' w='full'>
                  <Tab>Conta Corrente</Tab>
                  <Tab>Conta Café</Tab>
                  <Tab>Conta Escolha</Tab>
                  <Tab>Conta Colheita</Tab>
                  <Tab>Conta Sacaria</Tab>
                  <Tab>Informações Gerais</Tab>
                </TabList>
              </Box>
              <TabPanels>
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
                  <InDevelopmentTag />
                </TabPanel>
                <TabPanel>
                  <InDevelopmentTag />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </CardBody>
      </Card>
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
