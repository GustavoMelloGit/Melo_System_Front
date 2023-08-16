import { usePDF } from '@react-pdf/renderer'
import { useEffect } from 'react'
import { normalize } from '../../../../../lib/utils/normalize'
import { sortObjectProperties } from '../../../../../lib/utils/sortObjectProperties'
import IconButton from '../../../../../shared/components/IconButton'
import { getFertilizersDeliveryService } from '../../../services/get'
import PickupPDFTemplate from './Template'
import { type FertilizerDeliveryPDFData, type FertilizerDeliveryPDFItem } from './types'

export default function FertilizerDeliveryPDFDownloadButton(): JSX.Element {
  const { data, isLoading } = getFertilizersDeliveryService('status=inProgress&limit=10000')
  const [instance, updateInstance] = usePDF({
    document: <PickupPDFTemplate data={{}} />,
  })

  useEffect(() => {
    if (!isLoading && data) {
      const templateData: FertilizerDeliveryPDFData = {}
      data.data.forEach((order) => {
        const formattedBrook = normalize(order.brook).toUpperCase()
        const formattedOrder: FertilizerDeliveryPDFItem = order
        if (templateData[formattedBrook]) {
          templateData[formattedBrook].push(formattedOrder)
        } else {
          templateData[formattedBrook] = [formattedOrder]
        }
      })
      updateInstance(<PickupPDFTemplate data={sortObjectProperties(templateData)} />)
    }
  }, [data, isLoading])

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
