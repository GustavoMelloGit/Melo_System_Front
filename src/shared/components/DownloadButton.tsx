import { type ButtonProps } from '@chakra-ui/react'
import type ReactPDF from '@react-pdf/renderer'
import IconButton from './IconButton'

type Props = ButtonProps & {
  instance: ReactPDF.UsePDFInstance
}
export default function DownloadButton({ instance, ...props }: Props): JSX.Element {
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
      colorScheme='blue'
      variant='outline'
      {...props}
    />
  )
}
