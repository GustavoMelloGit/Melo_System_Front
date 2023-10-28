import { useColorModeValue } from '@chakra-ui/react'
import { type ApexOptions } from 'apexcharts'
import ReactApexChart, { type Props } from 'react-apexcharts'

export type PieChartProps = Omit<Props, 'series' | 'type'> & {
  options: ApexOptions
  chartData: ApexOptions['series']
}

export default function PieChart({ chartData, options, ...rest }: PieChartProps): JSX.Element {
  const foreColor = useColorModeValue('black', 'white')

  return (
    <ReactApexChart
      options={{
        chart: {
          foreColor,
        },
        ...options,
      }}
      series={chartData}
      type='pie'
      {...rest}
    />
  )
}
