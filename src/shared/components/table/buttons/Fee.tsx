import { IconButton, type IconButtonProps } from '@chakra-ui/react'
import { TbZoomMoney } from 'react-icons/tb'

export default function TableFeeButton(props: IconButtonProps): JSX.Element {
  return <IconButton icon={<TbZoomMoney size={22} />} variant='ghost' {...props} />
}
