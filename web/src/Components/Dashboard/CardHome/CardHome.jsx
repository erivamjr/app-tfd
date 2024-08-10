import React from 'react'
import Chart from '../Chart'
import useAppointment from '../../Hooks/Api/Appointments/Appointments'

export default function CardHome() {
  const { appointments, isLoading, isError } = useAppointment()
  console.log(appointments)
  const salesData = [
    { x: '2019/01/01', y: 400 },
    { x: '2019/04/01', y: 430 },
    { x: '2019/07/01', y: 448 },
    { x: '2019/10/01', y: 470 },
    { x: '2020/01/01', y: 540 },
    { x: '2020/04/01', y: 580 },
    { x: '2020/07/01', y: 690 },
    { x: '2020/10/01', y: 690 }
  ]
  return (
    <div className="flex-1 p-6">
      <header className="mb-1">
        <h1 className="text-2xl font-bold">Dashboard Gerencial</h1>
        <p className="text-gray-600">Analise de dados</p>
      </header>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 bg-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-white font-bold text-1xl">
            Total de agendas aberta
          </h2>
          <div className="text-white font-bold text-3xl">5</div>
        </div>
        <div className="col-span-2 bg-purple-500 p-4 rounded-lg shadow">
          <h2 className="text-white font-bold text-1xl">Total de agendas</h2>
          <div className="text-white font-bold text-3xl">5</div>
        </div>
        <div className="col-span-4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold">Título</h2>
        </div>
        {/* Cards do lado direito */}
        <div className="col-span-1 bg-blue-300 p-4 rounded-lg shadow">
          <h2 className="font-bold">Título</h2>
        </div>
        <div className="col-span-1 bg-green-300 p-4 rounded-lg shadow">
          <h2 className="font-bold">Título</h2>
        </div>
        <div className="col-span-1 bg-red-300 p-4 rounded-lg shadow">
          <h2 className="font-bold">Título</h2>
        </div>
        <div className="col-span-1 bg-blue-300 p-4 rounded-lg shadow">
          <h2 className="font-bold">Título</h2>
        </div>
        <div className="col-span-4 bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold">Agendas diaria</h2>
          <Chart data={salesData} title="Sales Data" />
        </div>
      </div>
    </div>
  )
}
