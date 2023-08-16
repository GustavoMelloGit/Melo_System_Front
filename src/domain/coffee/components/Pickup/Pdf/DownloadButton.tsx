import { usePDF } from '@react-pdf/renderer'
import { useEffect } from 'react'
import { formatClientName } from '../../../../../lib/utils/formatters'
import { normalize } from '../../../../../lib/utils/normalize'
import { sortObjectProperties } from '../../../../../lib/utils/sortObjectProperties'
import IconButton from '../../../../../shared/components/IconButton'
import { getPickupOrdersService } from '../../../services/Pickup/get'
import PickupPDFTemplate from './Template'
import { type PickupPDFData } from './types'

export default function PickupPDFDownloadButton(): JSX.Element {
  const { data, isLoading } = getPickupOrdersService('status=inProgress&limit=10000')
  const [instance, updateInstance] = usePDF({
    document: <PickupPDFTemplate data={{}} />,
  })

  useEffect(() => {
    if (!isLoading && data) {
      const templateData: PickupPDFData = {}
      data.data.forEach((order) => {
        const formattedBrook = normalize(order.brook).toUpperCase()
        const formattedOrder = {
          client: formatClientName(order.client),
          address: order.complement,
          bags: order.bags,
          id: order.id,
        }
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
      aria-label='Baixar lista de cafés a buscar'
      colorScheme='blue'
      variant='outline'
      data-cy='download-pickupCoffee-button'
      title='Baixar lista de cafés a buscar'
    />
  )
}
