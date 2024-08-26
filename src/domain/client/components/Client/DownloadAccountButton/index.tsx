import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import IconButton from '../../../../../shared/components/IconButton'
import useRenderPDF from '../../../../../shared/hooks/useRenderPDF'
import { type ClientAccount, type ResponseByClientAccount } from '../../../service'
import { ClientService } from '../../../service/ClientService'

type Props<T extends ClientAccount> = {
  account: T
  template: (data: Array<ResponseByClientAccount<T>>) => JSX.Element
}
export default function DownloadAccountButton<T extends ClientAccount>({
  account,
  template,
}: Props<T>): JSX.Element {
  const { uuid } = useParams<'uuid'>()
  const [isLoading, setIsLoading] = useState(false)
  const { render } = useRenderPDF()

  const renderPDF = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await ClientService.getTransactionsFromClient(account, uuid ?? '')
    setIsLoading(false)
    if (error ?? !data) {
      toast.error('Erro ao baixar o extrato')
      return
    }
    await render(template(data))
  }, [account, render, template, uuid])

  return (
    <IconButton
      aria-label='Baixar extrato'
      icon='printer'
      onClick={renderPDF}
      isLoading={isLoading}
    />
  )
}
