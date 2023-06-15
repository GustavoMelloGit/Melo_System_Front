import { IconButton as ChakraIconButton, type IconButtonProps } from '@chakra-ui/react'
import { cloneElement, useState, type MouseEvent } from 'react'
import { AiOutlineLock, AiOutlinePrinter } from 'react-icons/ai'
import { BiBlock, BiFilter } from 'react-icons/bi'
import { BsCheckCircle, BsTrash } from 'react-icons/bs'
import { HiArrowTopRightOnSquare } from 'react-icons/hi2'
import { IoAddOutline } from 'react-icons/io5'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { TbPencil, TbShoppingCart, TbZoomMoney } from 'react-icons/tb'
import { useModal } from '../hooks/useModal'
import { isAsyncFunction } from '../types/utils/typeGuards'

const buttonIcons = {
  add: <IoAddOutline size={24} />,
  check: <BsCheckCircle size={20} />,
  remove: <BsTrash size={18} />,
  shopCart: <TbShoppingCart size={21} />,
  printer: <AiOutlinePrinter size={22} />,
  sell: <RiExchangeDollarLine size={22} />,
  uncheck: <BiBlock size={20} />,
  edit: <TbPencil size={20} />,
  fee: <TbZoomMoney size={22} />,
  filter: <BiFilter size={28} />,
  linkTo: <HiArrowTopRightOnSquare size={20} />,
  lock: <AiOutlineLock />,
} as const

const shouldConfirmAction: Array<keyof typeof buttonIcons> = ['remove']

type Props = Omit<IconButtonProps, 'icon'> & {
  icon: keyof typeof buttonIcons
  confirm?: boolean
  iconSize?: number
}
export default function IconButton({
  icon,
  onClick,
  confirm = false,
  iconSize,
  ...props
}: Props): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)

  async function handleConfirm(e: MouseEvent<HTMLButtonElement>): Promise<void> {
    const ConfirmDialog = (await import('./ConfirmDialog')).default
    useModal.getState().openModal(
      <ConfirmDialog
        onResolve={(response) => {
          if (response && onClick) {
            if (isAsyncFunction(onClick)) {
              setIsLoading(true)
              void onClick(e)
              setIsLoading(false)
            } else {
              onClick(e)
            }
          }
        }}
      />,
    )
  }

  async function handleClick(e: MouseEvent<HTMLButtonElement>): Promise<void> {
    if (onClick) {
      if (confirm || shouldConfirmAction.includes(icon)) {
        await handleConfirm(e)
        return
      }
      if (isAsyncFunction(onClick)) {
        setIsLoading(true)
        await onClick(e)
        setIsLoading(false)
      } else {
        onClick(e)
      }
    }
  }

  return (
    <ChakraIconButton
      icon={cloneElement(buttonIcons[icon], { size: iconSize })}
      onClick={handleClick}
      isLoading={isLoading}
      variant='ghost'
      {...props}
    />
  )
}
