import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { formatClientName } from '../../../../../lib/utils/formatters'
import { normalize } from '../../../../../lib/utils/normalize'
import { sortObjectProperties } from '../../../../../lib/utils/sortObjectProperties'
import IconButton from '../../../../../shared/components/IconButton'
import { PickupEmitter } from '../../../events/pickup'
import { useGetPickupOrdersService } from '../../../services/Pickup/get'
import PickupPDFTemplate from './Template'
import { type PickupPDFData } from './types'

export default function PickupPDFDownloadButton(): JSX.Element {
  const { data, isLoading, mutate } = useGetPickupOrdersService('status=inProgress&limit=10000')
  const [instance, updateInstance] = usePDF({
    document: <PickupPDFTemplate data={{}} />,
  })

  const updatePdfInstance = useCallback(async () => {
    if (!data) return
    await mutate()
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
  }, [data, mutate, updateInstance])

  useEffect(() => {
    if (!isLoading && data) {
      void updatePdfInstance()
    }
  }, [data, isLoading, updatePdfInstance])

  useEffect(() => {
    PickupEmitter.on('pickupChecked', updatePdfInstance)
    PickupEmitter.on('pickupUnchecked', updatePdfInstance)
    PickupEmitter.on('pickupCreated', updatePdfInstance)
    PickupEmitter.on('pickupUpdated', updatePdfInstance)
    return () => {
      PickupEmitter.off('pickupChecked', updatePdfInstance)
      PickupEmitter.off('pickupUnchecked', updatePdfInstance)
      PickupEmitter.off('pickupCreated', updatePdfInstance)
      PickupEmitter.off('pickupUpdated', updatePdfInstance)
    }
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
      aria-label='Baixar lista de cafés a buscar'
      colorScheme='blue'
      variant='outline'
      data-cy='download-pickupCoffee-button'
      title='Baixar lista de cafés a buscar'
    />
  )
}
