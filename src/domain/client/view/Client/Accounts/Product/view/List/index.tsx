import { Navigate, useParams } from 'react-router-dom'
import { Routes } from '../../../../../../../../lib/routes'
import useServiceParams from '../../../../../../../../shared/hooks/useServiceParams'
import FertilizerAccountTable from '../../components/Table'
import { getFertilizerTransactionService } from '../../services/get'

export default function FertilizerAccountView(): JSX.Element {
  const { uuid } = useParams()
  const params = useServiceParams()

  const { data, isLoading } = getFertilizerTransactionService(uuid, params)

  if (!uuid) {
    return <Navigate to={Routes.clients} />
  }

  return (
    <FertilizerAccountTable
      data={data?.data}
      isLoading={isLoading}
      totalLength={data?.total ?? 0}
      clientId={uuid}
    />
  )
}
