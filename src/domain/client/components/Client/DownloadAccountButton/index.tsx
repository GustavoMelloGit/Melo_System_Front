import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { logger } from '../../../../../lib/utils/Logger'
import IconButton from '../../../../../shared/components/IconButton'
import { useModal } from '../../../../../shared/hooks/useModal'
import useRenderPDF from '../../../../../shared/hooks/useRenderPDF'
import {
  getTransactionsFromClientService,
  type ClientAccount,
  type ResponseByClientAccount,
} from '../../../service/getTransactionsFromClientService'
import PickDateModal, { type PickDateValues } from './PickDateModal'

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
    async (dates: PickDateValues) => {
      const searchParams = new URLSearchParams(dates).toString()
      const { data, error } = await getTransactionsFromClientService(
        account,
        uuid ?? '',
        searchParams,
      )
      if (error ?? !data) {
        toast.error('Erro ao baixar o extrato')
        logger.error(`Erro ao baixar extrato da conta ${account}: ${error}`)
        return
      }

      await render(template(data))
      closeModal()
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
