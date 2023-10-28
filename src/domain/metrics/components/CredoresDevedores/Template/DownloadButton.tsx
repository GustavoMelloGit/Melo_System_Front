import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import DownloadButton from '../../../../../shared/components/DownloadButton'
import { type ClientModel } from '../../../../client/types/model/Client'
import CredoresDevedoresMetricsTemplate from './Template'

type Props = {
  data: ClientModel[]
}
export default function CredoresDevedoresMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <CredoresDevedoresMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<CredoresDevedoresMetricsTemplate data={data} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <DownloadButton
      instance={instance}
      aria-label='Baixar relatório credores e devedores'
      data-cy='download-creadores-devedores-metrics'
      title='Baixar relatório credores e devedores'
    />
  )
}
