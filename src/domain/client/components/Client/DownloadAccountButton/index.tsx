import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import IconButton from '../../../../../shared/components/IconButton'
import { useModal } from '../../../../../shared/hooks/useModal'
import useRenderPDF from '../../../../../shared/hooks/useRenderPDF'
import { ClientService, type ClientAccount, type ResponseByClientAccount } from '../../../service'
import PickDateModal, { type PickDateFormValues } from './PickDateModal'

type Props<T extends ClientAccount> = {
  account: T
  template: (data: Array<ResponseByClientAccount<T>>) => JSX.Element
}
export default function DownloadAccountButton<T extends ClientAccount>({
  account,
  template,
}: Props<T>): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const openModal = useModal((state) => state.openModal)
  const closeModal = useModal((state) => state.closeModal)
  const { render } = useRenderPDF()

  const renderPDF = useCallback(
    async ({ hasDateRange, ...dates }: PickDateFormValues) => {
      const searchParams = new URLSearchParams()
      if (hasDateRange) {
        searchParams.append('startDate', dates.startDate)
        searchParams.append('endDate', dates.endDate)
      }
      const { data, error } = await ClientService.getTransactionsFromClient(
        account,
        uuid ?? '',
        searchParams.toString(),
      )
      if (error ?? !data) {
        toast.error('Erro ao baixar o extrato')
        return
      }
      await render(template(data))
    },
    [account, closeModal, render, template, uuid],
  )

  return (
    <IconButton
      aria-label='Baixar extrato'
      icon='printer'
      onClick={() => {
        openModal(<PickDateModal onSubmit={renderPDF} />)
      }}
    />
  )
}
