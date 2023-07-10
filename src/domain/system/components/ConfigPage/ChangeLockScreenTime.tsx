import { Flex, Select, Text } from '@chakra-ui/react'
import { shallow } from 'zustand/shallow'
import { useScreenProtectionStore } from '../../../../lib/stores/ScreenProtectionStore'

const minutesToMilliseconds = (minutes: number): number => {
  return minutes * 60_000
}

export default function ChangeLockScreenTime(): JSX.Element {
  const { delay, setDelay } = useScreenProtectionStore(
    (state) => ({
      delay: state.delayToLock,
      setDelay: state.setDelayToLock,
    }),
    shallow,
  )
  return (
    <Flex flexWrap='wrap' gap={2} w='full' justify='space-between' align='center'>
      <Text fontWeight={700} fontSize='lg'>
        Tempo para bloqueio de tela
      </Text>
      <Select
        w={40}
        defaultValue={delay}
        onChange={(e) => {
          setDelay(Number(e.target.value))
        }}
      >
        <option value={minutesToMilliseconds(1)}>1 minuto</option>
        <option value={minutesToMilliseconds(5)}>5 minutos</option>
        <option value={minutesToMilliseconds(10)}>10 minutos</option>
        <option value={minutesToMilliseconds(15)}>15 minutos</option>
        <option value={minutesToMilliseconds(29)}>20 minutos</option>
      </Select>
    </Flex>
  )
}
