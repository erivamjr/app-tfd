import React from 'react'
import Chart from 'react-apexcharts'
import ApexCharts from 'apexcharts'

type ChartComponentProps = {
  type: 'pie' | 'bar' | 'line' // Defina os tipos esperados
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  title: string
  height?: number
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  type,
  data,
  title,
  height,
}) => {
  // Verifica se data está presente e se é um array ou objeto adequado
  if (!data) {
    return <div>No data available</div>
  }

  // Opções para o gráfico de barras
  const barChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: height || 350,
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
    xaxis: {
      categories:
        Array.isArray(data) && data.length > 0
          ? data.map(
              (monthData: { month: string; year: string }) =>
                `${monthData.month}/${monthData.year}`,
            )
          : [],
    },
    yaxis: {
      title: {
        text: 'Total Agendamentos',
      },
    },
  }

  const barChartSeries = [
    {
      name: 'Agendamentos',
      data:
        Array.isArray(data) && data.length > 0
          ? data.map((monthData: { total: string }) =>
              parseInt(monthData.total, 10),
            )
          : [],
    },
  ]

  // Opções para o gráfico de pizza
  const pieChartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
    },
    labels: Array.isArray(data)
      ? data.map((item: { label: string }) => item.label)
      : [],
    legend: {
      position: 'bottom', // Coloca as legendas embaixo
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  }

  const pieChartSeries =
    Array.isArray(data) && data.length > 0
      ? data.map((item: { total: string }) => parseInt(item.total, 10))
      : []

  // Tradução das legendas para português no gráfico de status
  if (type === 'pie') {
    data.forEach((item: { label: string }) => {
      if (item.label === 'InProgress') item.label = 'Em Andamento'
      if (item.label === 'Scheduled') item.label = 'Agendado'
      if (item.label === 'Completed') item.label = 'Finalizado'
    })
  }

  return (
    <div className="my-4">
      <h3 className="text-center text-xl mb-4">{title}</h3>
      <Chart
        options={type === 'pie' ? pieChartOptions : barChartOptions}
        series={type === 'pie' ? pieChartSeries : barChartSeries}
        type={type}
        width="100%"
        height={height || 350}
      />
    </div>
  )
}

export default ChartComponent
