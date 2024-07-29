import { type ApexOptions } from 'apexcharts'
import { format } from 'date-fns'
import Chart from 'react-apexcharts'
import { centsToCurrency } from '../../../../lib/utils/formatters'
import { type GetTransactionMetricsResponse } from '../../types/transactionMetrics'

type Props = {
  data: GetTransactionMetricsResponse
}
export default function ChartView({ data }: Props): JSX.Element {
  const options: ApexOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: data.data.map((transaction) => format(transaction.props.createdAt, 'dd/MM/yyyy')),
    },
  }
  const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      name: 'test',
      data: data.data.map((transaction) => centsToCurrency(transaction.props.type.value)),
    },
  ]
  return <Chart options={options} series={series} />
}
