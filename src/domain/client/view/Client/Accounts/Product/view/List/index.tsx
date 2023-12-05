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
      data={[
        {
          id: '656cc48707223283a2087bec',
          type: {
            name: 'fertilizer',
            value: 3,
          },
          description: 'COMPROU 3 UNIDADE(S) DE Produto x R$ 60,00',
          date: 1701627015551,
          createdAt: 1701627015551,
          updatedAt: 1701627015551,
          clientBalance: 94,
          user: {
            name: 'Administrador',
            updatedAt: 1692014404547,
            id: '64da18581abcb31c7523ee17',
          },
          clientId: '653959f3f7fb577d1c9245c0',
          userId: '64da18581abcb31c7523ee17',
          sale: [
            {
              deliveryDate: 1701627015130,
              fertilizerId: '656cc07e908a8393f70ebed4',
              fertilizerDescription: 'Produto',
              fertilizerName: 'Produto nome',
              bags: 3,
              pricePerBag: 2000,
              brook: '',
              complement: '',
            },
            {
              deliveryDate: 1701627015130,
              fertilizerId: '656cc07e908a8393f70ebed4',
              fertilizerDescription: 'Produto',
              fertilizerName: 'Produto nome',
              bags: 8,
              pricePerBag: 8000,
              brook: '',
              complement: '',
            },
          ],
        },
      ]}
      isLoading={isLoading}
      totalLength={data?.total ?? 0}
      clientId={uuid}
    />
  )
}
