import { type ApexOptions } from 'apexcharts'
import currency from 'currency.js'
import { format } from 'date-fns'
import Chart from 'react-apexcharts'
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
      data: data.data.map(
        (transaction) => currency(transaction.props.type.value).divide(100).value,
      ),
    },
  ]
  return <Chart options={options} series={series} />
}
