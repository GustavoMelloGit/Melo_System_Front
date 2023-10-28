import { Box, Card, CardBody } from '@chakra-ui/react'
import { capitalCase } from 'change-case'
import { getNumberOfBags } from '../../../../lib/utils/getNumberOfBags'
import PieChart, { type PieChartProps } from '../../../../shared/components/PieChart'
import { type ClientCoffeeMetric } from '../../types/credoresDevedoresCafeMetrics'

type Props = {
  data: ClientCoffeeMetric[]
  isLoading: boolean
}

export default function GraphView({ data, isLoading }: Props): JSX.Element {
  const [coffeeTypeChartData, clientChartData] = formatDataToChart(data)

  return (
    <Card>
      <CardBody>
        <Box
          display='grid'
          gridTemplateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
          }}
          gap={4}
          maxW={800}
          mx='auto'
        >
          <PieChart
            chartData={coffeeTypeChartData.chartData}
            options={coffeeTypeChartData.options}
          />
          <PieChart chartData={clientChartData.chartData} options={clientChartData.options} />
        </Box>
      </CardBody>
    </Card>
  )
}

type Charts = 'client' | 'coffee'

function formatDataToChart(data: ClientCoffeeMetric[]): PieChartProps[] {
  const chartGrouping: Record<Charts, Array<{ label: string; value: number }>> = {
    client: [],
    coffee: [],
  }

  data.forEach((d) => {
    // coffee type group
    const value = Math.abs(d.balance.total)
    const hasType = chartGrouping.coffee.find((type) => type.label === d.balance.type)
    if (hasType) {
      hasType.value += value
    } else {
      chartGrouping.coffee.push({
        label: d.balance.type,
        value,
      })
    }

    // client group
    const hasClient = chartGrouping.client.find((cg) => cg.label === d.name)
    if (hasClient) {
      hasClient.value += value
    } else {
      chartGrouping.client.push({
        label: d.name,
        value,
      })
    }
  })

  const coffeeTypeChartData: PieChartProps = {
    options: {
      labels: chartGrouping.coffee.map((g) => capitalCase(g.label)),
      tooltip: {
        y: {
          formatter(val, opts) {
            return getNumberOfBags(val)
          },
        },
      },
    },
    chartData: chartGrouping.coffee.map((g) => g.value),
  }

  const clientChartData: PieChartProps = {
    options: {
      labels: chartGrouping.client.map((g) => g.label),
      tooltip: {
        y: {
          formatter(val, opts) {
            return getNumberOfBags(val)
          },
        },
      },
    },
    chartData: chartGrouping.client.map((g) => g.value),
  }
  return [coffeeTypeChartData, clientChartData]
}
