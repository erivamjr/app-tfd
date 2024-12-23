import React from 'react'
import ApexCharts from 'react-apexcharts'

const Chart = ({ data, title }) => {
  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: title,
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: 'Sales',
      },
    },
  }

  const series = [
    {
      name: 'Sales',
      data,
    },
  ]

  return (
    <div>
      <ApexCharts
        options={options}
        series={series}
        type="line"
        height="350"
        className="w-full"
      />
    </div>
  )
}

export default Chart
