import { type ButtonProps } from '@chakra-ui/react'
import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import IconButton from '../IconButton'

export type Props = ButtonProps & {
  template: JSX.Element
}
export default function DownloadButton({
  template,
  variant,
  isLoading,
  ...props
}: Props): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: template,
  })

  const updatePdfInstance = useCallback(async () => {
    updateInstance(template)
  }, [updateInstance, template])

  useEffect(() => {
    void updatePdfInstance()
  }, [updatePdfInstance])

  return (
    <IconButton
      isDisabled={Boolean(instance.error)}
      isLoading={isLoading ?? instance.loading}
      as='a'
      /* @ts-expect-error: this property does exist */
      href={instance.url ?? ''}
      target='_blank'
      rel='noreferrer'
      icon='printer'
      {...props}
    />
  )
}
