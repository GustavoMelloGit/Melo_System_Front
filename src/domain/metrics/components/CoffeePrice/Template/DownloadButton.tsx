import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import IconButton from '../../../../../shared/components/IconButton'
import { type CoffeePriceMetrics } from '../../../types/buyCoffeeMetrics'
import CoffeePriceMetricsTemplate from './Template'

type Props = {
  data: CoffeePriceMetrics[]
}
export default function CoffeePriceMetricsDownloadButton({ data }: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: <CoffeePriceMetricsTemplate data={data} />,
  })
  const updatePdfInstance = useCallback(async () => {
    updateInstance(<CoffeePriceMetricsTemplate data={data} />)
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
