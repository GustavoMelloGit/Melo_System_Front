import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import { normalize } from '../../../../../lib/utils/normalize'
import { sortObjectProperties } from '../../../../../lib/utils/sortObjectProperties'
import IconButton from '../../../../../shared/components/IconButton'
import { type GetListResponse } from '../../../../../shared/types/service/GetListResponse'
import { DeliveryEmitter } from '../../../events/DeliveryEmitter'
import { getFertilizersDeliveryService } from '../../../services/get'
import { type FertilizerDeliveryModel } from '../../../types/model/Delivery'
import PickupPDFTemplate from './Template'
import { type FertilizerDeliveryPDFData, type FertilizerDeliveryPDFItem } from './types'

const today = new Date(`${new Date().toISOString().split('T')[0]}T23:59:59`).getTime()

function parseData(
  data: GetListResponse<FertilizerDeliveryModel[]> | undefined,
): GetListResponse<FertilizerDeliveryModel[]> {
  if (!data) {
    return {
      data: [],
      limit: 10,
      page: 0,
      total: 0,
    }
  }
  return {
    ...data,
    data: data.data.filter((d) => d.date < today),
  }
}

export default function FertilizerDeliveryPDFDownloadButton(): JSX.Element {
  const { data, isLoading, mutate } = getFertilizersDeliveryService('status=inProgress&limit=10000')
  const [instance, updateInstance] = usePDF({
    document: <PickupPDFTemplate data={{}} />,
  })
  const parsedData = parseData(data)
  const updatePdfInstance = useCallback(async () => {
    if (!parsedData) return
    await mutate()
    const templateData: FertilizerDeliveryPDFData = {}
    parsedData.data.forEach((order) => {
      const formattedBrook = normalize(order.brook).toUpperCase()
      const formattedOrder: FertilizerDeliveryPDFItem = order
      if (templateData[formattedBrook]) {
        templateData[formattedBrook].push(formattedOrder)
      } else {
        templateData[formattedBrook] = [formattedOrder]
      }
    })
    updateInstance(<PickupPDFTemplate data={sortObjectProperties(templateData)} />)
  }, [parsedData, mutate])

  useEffect(() => {
    if (!isLoading && parsedData) {
      void updatePdfInstance()
    }
  }, [updatePdfInstance, isLoading, parsedData])

  useEffect(() => {
    DeliveryEmitter.on('deliveryCreated', updatePdfInstance)
    DeliveryEmitter.on('deliveryChanged', updatePdfInstance)
    return () => {
      DeliveryEmitter.off('deliveryCreated', updatePdfInstance)
      DeliveryEmitter.off('deliveryChanged', updatePdfInstance)
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
      aria-label='Baixar lista de adubos a entregar'
      colorScheme='blue'
      variant='outline'
      data-cy='download-fertilzer-delivery-button'
      title='Baixar lista de adubos a entregar'
    />
  )
}
