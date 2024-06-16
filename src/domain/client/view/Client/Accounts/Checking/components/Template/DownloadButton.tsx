import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import IconButton from '../../../../../../../../shared/components/IconButton'
import { useModal } from '../../../../../../../../shared/hooks/useModal'
import useRenderPDF from '../../../../../../../../shared/hooks/useRenderPDF'
import { getTransactionsFromClientService } from '../../../../../../service/getTransactionsFromClientService'
import PickDateModal, { type PickDateValues } from './PickDateModal'
import DownloadCheckingAccountTemplate from './Template'

export default function DownloadCheckingAccountButton(): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const openModal = useModal((state) => state.openModal)
  const closeModal = useModal((state) => state.closeModal)
  const { render } = useRenderPDF()

  const renderPDF = useCallback(
    async (dates: PickDateValues) => {
      const searchParams = new URLSearchParams(dates).toString()
      const { data, error } = await getTransactionsFromClientService(
        'currency',
        uuid ?? '',
        searchParams,
      )
      if (error ?? !data) return
      await render(<DownloadCheckingAccountTemplate data={data} />)
      closeModal()
    },
    [closeModal, render, uuid],
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
