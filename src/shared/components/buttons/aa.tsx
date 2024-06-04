import { type ButtonProps } from '@chakra-ui/react'
import { usePDF } from '@react-pdf/renderer'
import { useCallback, useEffect } from 'react'
import IconButton from '../IconButton'

type TemplateProps<T> = {
  data: T
}
type Props<T> = ButtonProps & {
  template: (props: TemplateProps<T>) => JSX.Element
  data: T
}
export default function DownloadButton<T>({ template, data, ...props }: Props<T>): JSX.Element {
  const [instance, updateInstance] = usePDF({
    document: template({ data }),
  })

  const updatePdfInstance = useCallback(async () => {
    updateInstance(template({ data }))
  }, [data, updateInstance, template])

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
      {...props}
    />
  )
}
