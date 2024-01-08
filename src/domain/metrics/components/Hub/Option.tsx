import { Box, Card, CardBody, Center, Flex, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'

type Props = {
  title: string
  subtitle: string
  icon: ReactNode
  url: string
}
export default function MetricsHubOption({ icon, subtitle, title, url }: Props): JSX.Element {
  return (
    <LinkBox
      as={Card}
      transition='transform 120ms ease-in'
      _hover={{
        transform: 'scale(1.01)',
      }}
    >
      <CardBody
        p={{
          base: 3,
          sm: 5,
        }}
      >
        <Flex gap={3} align='center'>
          <Center boxSize={'40px'}>{icon}</Center>
          <Box>
            <Heading
              as='h2'
              fontSize={{
                base: 'md',
                sm: 'lg',
              }}
              mb={0.5}
            >
              {title}
            </Heading>
            <Heading
              as='h3'
              fontSize={{
                base: 'xs',
                sm: 'sm',
              }}
              fontWeight={500}
              opacity={0.7}
            >
              <LinkOverlay as={Link} to={url}>
                {subtitle}
              </LinkOverlay>
            </Heading>
          </Box>
          <IoIosArrowForward
            size={24}
            style={{
              marginLeft: 'auto',
            }}
          />
        </Flex>
      </CardBody>
    </LinkBox>
  )
}
