import DownloadButton, { type Props } from '../../../shared/components/buttons/DownloadButton'

export default function MetricsDownloadButton({ ...props }: Props): JSX.Element {
  return <DownloadButton colorScheme='blue' variant='outline' {...props} />
}
