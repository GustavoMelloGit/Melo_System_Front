import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { FaLock } from 'react-icons/fa'
import * as yup from 'yup'
import { shallow } from 'zustand/shallow'
import BackgroundImage1 from '../../../../lib/assets/lockscreen-background-1.webp'
import BackgroundImage2 from '../../../../lib/assets/lockscreen-background-2.webp'
import BackgroundImage3 from '../../../../lib/assets/lockscreen-background-3.webp'
import { validationErrors } from '../../../../lib/errors'
import { useScreenProtectionStore } from '../../../../lib/stores/ScreenProtectionStore'
import { useModal } from '../../../hooks/useModal'
import ControllerField from '../../inputs/ControllerField'

const backgroundImages = [BackgroundImage1, BackgroundImage2, BackgroundImage3]

const schema = yup.object().shape({
  password: yup.string().required(validationErrors.passwordIsRequired),
})

type LockScreenFormValues = {
  password: string
}
export default function LockScreenView(): JSX.Element {
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(1)
  const { unlock, password } = useScreenProtectionStore(
    (state) => ({ unlock: state.unlock, password: state.password }),
    shallow,
  )
  const openModal = useModal((state) => state.openModal)
  const { control, handleSubmit, setError } = useForm<LockScreenFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
    },
  })

  async function handleGoToChangePassword(): Promise<void> {
    const SetLockScreenPassword = (await import('./SetLockScreenPassword')).default
    openModal(<SetLockScreenPassword />)
  }

  function handleUnlock(data: LockScreenFormValues): void {
    if (data.password === password) unlock()
    else setError('password', { message: validationErrors.passwordIsIncorrect })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackgroundImage((prev) => {
        if (prev === 3) return 1
        return prev + 1
      })
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta name='robots' content='noindex' />
        <link rel='preload' href={BackgroundImage1} as='image' />
        <link rel='preload' href={BackgroundImage2} as='image' />
        <link rel='preload' href={BackgroundImage3} as='image' />
      </Helmet>
      <Flex
        minH='100svh'
        flexDir={{
          base: 'column-reverse',
          md: 'row',
        }}
      >
        <Box
          as='aside'
          pos='relative'
          bgImage={backgroundImages[currentBackgroundImage - 1]}
          bgSize='cover'
          bgPosition='center'
          bgRepeat='no-repeat'
          transition='background-image 0.5s ease-in-out'
          flex={1}
          role='img'
          aria-label='Background'
          maxW={{
            base: '100%',
            md: 'calc(50vw - 200px)',
          }}
        />
        <Box
          flex={1}
          px={9}
          pt={{
            base: 0,
            md: 40,
          }}
          display='flex'
          alignItems={{
            base: 'center',
            md: 'flex-start',
          }}
          justifyContent={{
            base: 'center',
            md: 'flex-start',
          }}
        >
          <Box maxW={300}>
            <form onSubmit={handleSubmit(handleUnlock)} autoComplete='off'>
              <Heading as='h1' size='xl' fontWeight={700}>
                Você ativou o bloqueio de tela
              </Heading>
              <Heading as='h2' size='sm' mb={8} fontWeight={500} mt={2}>
                Digite sua senha para desbloquear
              </Heading>
              <ControllerField
                leftIcon={<FaLock />}
                name='password'
                control={control}
                type='password'
                placeholder='Digite sua senha'
                variant='filled'
                autoComplete='off'
              />
              <Text fontSize='sm' color='gray.500' mt={2}>
                Esqueceu sua senha?{' '}
                <Button
                  variant='link'
                  color='yellow.500'
                  fontWeight={500}
                  fontSize='sm'
                  onClick={handleGoToChangePassword}
                >
                  Alterar senha
                </Button>
              </Text>
              <Button type='submit' w='full' colorScheme='yellow' mt={5}>
                Desbloquear
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
