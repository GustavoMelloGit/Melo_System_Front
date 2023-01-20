import { VStack } from '@chakra-ui/react'
import { Routes } from '../../../../lib/routes'
import HeaderBreadcrumbs from '../../../../shared/components/layout/Header/HeaderBreadcrumbs'

export default function CreateClientsView(): JSX.Element {
  return (
    <VStack align='flex-start'>
      <HeaderBreadcrumbs
        heading='Crie um novo cliente'
        links={[
          {
            label: 'Clientes',
            to: Routes.clients,
          },
          {
            label: 'Criar Cliente',
          },
        ]}
      />
    </VStack>
  )
}
