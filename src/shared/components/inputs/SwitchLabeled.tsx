import { Button, Flex, useColorModeValue, type ButtonProps, type FlexProps } from '@chakra-ui/react'
import { useState } from 'react'

type Props<T = unknown> = {
  onChange: (value: T) => void
  leftLabel: string
  rightLabel: string
  defaultActive?: number
  leftValue?: T
  rightValue?: T
  leftButtonProps?: ButtonProps & Record<string, string>
  rightButtonProps?: ButtonProps & Record<string, string>
  wrapperProps?: FlexProps
}
export default function SwitchLabeled({
  onChange,
  leftLabel,
  rightLabel,
  defaultActive = 0,
  leftValue,
  rightValue,
  leftButtonProps,
  rightButtonProps,
  wrapperProps,
}: Props): JSX.Element {
  const wrapperBg = useColorModeValue('gray.300', 'gray.700')
  const afterColor = useColorModeValue('gray.700', 'gray.100')
  const [currentActive, setCurrentActive] = useState<number>(defaultActive)

  function handleLeftClick(): void {
    if (currentActive === 0) return
    setCurrentActive(0)
    onChange(leftValue ?? false)
  }

  function handleRightClick(): void {
    if (currentActive === 1) return
    setCurrentActive(1)
    onChange(rightValue ?? true)
  }
  const beforeProps = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    bg: 'gray.500',
    animationDuration: '300ms',
    animationTimingFunction: 'ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  }

  const afterProps = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  }

  return (
    <Flex p={1} gap={1} bg={wrapperBg} rounded={8} {...wrapperProps}>
      <Button
        variant='ghost'
        onClick={handleLeftClick}
        rounded={4}
        data-current={currentActive === 0}
        px={10}
        pos='relative'
        size='sm'
        {...(currentActive === 0 && {
          _before: {
            content: '""',
            animation: 'slideRight ',
            ...beforeProps,
          },
        })}
        _after={{
          content: `'${leftLabel}'`,
          color: currentActive === 0 ? 'gray.100' : afterColor,
          ...afterProps,
        }}
        {...rightButtonProps}
      >
        {leftLabel}
      </Button>
      <Button
        onClick={handleRightClick}
        variant={'ghost'}
        rounded={4}
        data-current={currentActive === 1}
        px={10}
        size='sm'
        pos='relative'
        {...(currentActive === 1 && {
          _before: {
            content: '""',
            animation: 'slideLeft',
            ...beforeProps,
          },
        })}
        _after={{
          content: `'${rightLabel}'`,
          color: currentActive === 1 ? 'gray.100' : afterColor,
          ...afterProps,
        }}
        {...leftButtonProps}
      >
        {rightLabel}
      </Button>
    </Flex>
  )
}
