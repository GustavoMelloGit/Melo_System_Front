import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import IconButton from '../../../../../shared/components/IconButton'
import { type BuyCoffeeMetric } from '../../../types/coffeePriceMetrics'
import BuyCoffeeMetricsTemplate from './Template'

type Props = {
  data: BuyCoffeeMetric[]
}
export default function BuyCoffeeMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <BuyCoffeeMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<BuyCoffeeMetricsTemplate data={data} />)
  }, [data, updateInstance])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <IconButton
      isDisabled={Boolean(instance.error)}
      isLoading={instance.loading}
      as='a'
      /* @ts-expect-error: this property does exist */
      href={instance.url ?? ''}
      target='_blank'
      rel='noreferrer'
      icon='printer'
      aria-label='Baixar lista de adubos a entregar'
      colorScheme='blue'
      variant='outline'
      data-cy='download-fertilzer-delivery-button'
      title='Baixar lista de adubos a entregar'
    />
  )
}
