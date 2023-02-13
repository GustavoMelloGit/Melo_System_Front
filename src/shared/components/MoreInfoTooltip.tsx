import { Tooltip, type TooltipProps } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'

type MoreInfoTooltipProps = Omit<TooltipProps, 'children'> & {
  children?: ReactNode
}
export default function MoreInfoTooltip({
  label,
  children,
  ...rest
}: MoreInfoTooltipProps): JSX.Element {
  return (
    <Tooltip shouldWrapChildren hasArrow label={label} {...rest}>
      {children ?? <AiOutlineInfoCircle size={22} />}
    </Tooltip>
  )
}
