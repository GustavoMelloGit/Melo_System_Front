import HeaderBreadcrumbs from '../../../../../shared/components/layout/Header/HeaderBreadcrumbs'
import Page from '../../../../../shared/components/Page'
import BirthdaysTable from '../../../components/Clients/BirthdaysTable'
import useBirthdaysView from './useView'

export default function BirthdaysView(): JSX.Element {
  const { data, isLoading } = useBirthdaysView()
  return (
    <Page title='Clientes' data-cy='list-clients-page'>
      <HeaderBreadcrumbs
        heading='Aniversariantes'
        links={[
          {
            label: 'Lista de aniversariantes',
          },
        ]}
      />
      <BirthdaysTable clients={data} isLoading={isLoading} />
    </Page>
  )
}
