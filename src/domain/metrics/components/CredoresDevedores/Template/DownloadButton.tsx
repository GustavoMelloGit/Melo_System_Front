import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { type ClientModel } from '../../../../client/types/model/Client'
import MetricsDownloadButton from '../../MetricsDownloadButton'
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
    <MetricsDownloadButton
      instance={instance}
      aria-label='Baixar relatório credores e devedores'
      data-cy='download-creadores-devedores-metrics'
      title='Baixar relatório credores e devedores'
    />
  )
}
