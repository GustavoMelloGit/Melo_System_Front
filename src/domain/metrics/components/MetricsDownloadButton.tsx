import { type ButtonProps } from '@chakra-ui/react'
import type ReactPDF from '@react-pdf/renderer'
import DownloadButton from '../../../shared/components/buttons/DownloadButton'

type Props = ButtonProps & {
  instance: ReactPDF.UsePDFInstance
}
export default function MetricsDownloadButton({ instance, ...props }: Props): JSX.Element {
  return <DownloadButton instance={instance} colorScheme='blue' variant='outline' {...props} />
}
