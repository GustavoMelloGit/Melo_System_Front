import { Card, Heading, useColorModeValue, VStack } from '@chakra-ui/react'
import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

export default function HomePage(): JSX.Element {
  const tooltipTheme = useColorModeValue('light', 'dark')
  const chartOptions: ApexOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
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

  return (
    <VStack align='flex-start' spacing={10}>
      <Heading>Página inicial</Heading>
      <Card pt={5} pr={5}>
        <Chart options={chartOptions} series={series} height={200} width={400} type='line' />
      </Card>
    </VStack>
  )
}
