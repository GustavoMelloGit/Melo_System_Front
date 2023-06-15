import { Button, Center, Heading } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useScreenProtectionStore } from '../../../../lib/stores/ScreenProtectionStore'
import ControllerField from '../../inputs/ControllerField'

type LockScreenFormValues = {
  password: string
}
export default function LockScreenView(): JSX.Element {
  const unlock = useScreenProtectionStore((state) => state.unlock)
  const { control, handleSubmit } = useForm<LockScreenFormValues>()

  function handleUnlock(data: LockScreenFormValues): void {
    if (data.password) unlock()
  }

  return (
    <Center minH='100vh'>
      <form onSubmit={handleSubmit(handleUnlock)}>
        <Heading as='h1' size='lg' mb={4}>
          Lock Screen
        </Heading>
        <ControllerField
          name='password'
          control={control}
          label='Senha'
          type='password'
          placeholder='Digite sua senha'
        />
        <Button type='submit' w='full'>
          Unlock
        </Button>
      </form>
    </Center>
  )
}
