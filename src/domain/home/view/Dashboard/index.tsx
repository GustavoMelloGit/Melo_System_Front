import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

export default function HomePage(): JSX.Element {
  const tooltipTheme = useColorModeValue('light', 'dark')
  const labelColors = useColorModeValue('#000', '#fff')
  const chartOptions: ApexOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      labels: {
        style: {
          colors: labelColors,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColors,
        },
      },
    },
    tooltip: {
      theme: tooltipTheme,
    },
  }

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]

  const columnChart: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      labels: {
        style: {
          colors: labelColors,
        },
      },
    },
    legend: {
      labels: {
        colors: labelColors,
      },
    },
    yaxis: {
      title: {
        text: 'R$ (milhares)',
        style: {
          color: labelColors,
        },
      },
      labels: {
        style: {
          colors: labelColors,
        },
      },
    },
    fill: {
      opacity: 1,
    },
  }

  const columnChartSeries: ApexAxisChartSeries = [
    {
      name: 'Cafés vendidos',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
    {
      name: 'Empréstimos concedidos',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
    {
      name: 'Adubos vendidos',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ]

  return (
    <VStack align='stretch' spacing={10}>
      <Heading>Página inicial</Heading>
      <Grid w='full' gridTemplateColumns='repeat( auto-fit, minmax(200px, 1fr) )' gap={6}>
        <GridItem>
          <InfoCard
            title='Saldo devedor'
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(1000000.0)}
          />
        </GridItem>
        <GridItem>
          <InfoCard
            title='Saldo credor'
            value={new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(103280.0)}
          />
        </GridItem>
        <GridItem>
          <InfoCard title='Número de clientes' value='10' />
        </GridItem>
        <GridItem>
          <InfoCard title='Adubos em estoque' value='120' />
        </GridItem>
      </Grid>

      <Box w='full'>
        <Chart
          options={columnChart}
          series={columnChartSeries}
          type='bar'
          width='100%'
          height={350}
        />
      </Box>

      <Flex justify='space-between' flexWrap='wrap' align='center' gap={4}>
        <Card pt={5} pr={5}>
          <CardBody>
            <Chart options={chartOptions} series={series} height={200} width={400} type='line' />
          </CardBody>
        </Card>
        <Card pt={5} pr={5}>
          <CardBody>
            <Chart options={chartOptions} series={series} height={200} width={400} type='line' />
          </CardBody>
        </Card>
      </Flex>
    </VStack>
  )
}

type InfoCardProps = {
  title: React.ReactNode
  value: React.ReactNode
}
function InfoCard({ title, value }: InfoCardProps): JSX.Element {
  return (
    <Card px={4} py={5}>
      <CardHeader p={0}>
        <Heading as='h3' size='md' fontWeight={500}>
          {title}
        </Heading>
      </CardHeader>
      <CardBody p={0}>
        <Text fontSize='xl' color='blue.500' fontWeight={700}>
          {value}
        </Text>
      </CardBody>
    </Card>
  )
}
