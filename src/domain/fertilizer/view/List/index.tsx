import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { AiOutlineUserAdd } from 'react-icons/ai'
import Page from '../../../../shared/components/Page'
import FertilizersTable from '../../components/FertilizersTable'

export default function FertilizerListView(): JSX.Element {
  return (
    <Page title='Adubos'>
      <Flex as='header' justify='space-between'>
        <Heading>Adubos</Heading>
        <IconButton
          aria-label='Adicionar adubo'
          icon={<AiOutlineUserAdd />}
          colorScheme='blue'
          variant='outline'
        />
      </Flex>
      <FertilizersTable
        data={[]}
        isLoading={false}
        onUpdateAction={(value) => {
          console.log(value)
        }}
      />
    </Page>
  )
}
