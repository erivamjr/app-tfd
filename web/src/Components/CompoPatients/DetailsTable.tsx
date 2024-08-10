import DisplayMessage from '../Ux/DisplayMessage/DisplayMessage'

interface DetailsTableProps {
  item: any
  isLoadingPoint: boolean
  isErrorPoint: boolean
}

export default function DetailsTable({
  item,
  isLoadingPoint,
  isErrorPoint,
}: DetailsTableProps) {
  if (isLoadingPoint)
    return <DisplayMessage message={'Carregando'} color="green" text="white" />

  if (isErrorPoint)
    return (
      <DisplayMessage
        message={'Erro na solicitação.'}
        color="red"
        text="white"
      />
    )
  console.log(item)
  if (!item)
    return (
      <DisplayMessage
        message={'Consultando ...'}
        color="yellow"
        text="white"
      />
    )

  return (
    <div className="mt-6">
      <div className="">
        <div className="mb-5 ">
          <div className="grid grid-cols-12 gap-2 rounded p-2 text-center bg-blue-600 text-white ">
            <div>ID</div>
            <div>Usuario</div>
            <div>Prioridade</div>
            <div>Diagnostico</div>
            <div>Exame</div>
            <div>Solicitação</div>
            <div>CID</div>
            <div>Médico</div>
            <div>CRM</div>
            <div>Agendamento</div>
            <div>Status</div>
          </div>
        </div>
        <div className="border mb-4 border-[#008BAD] p-3 rounded" key={item.id}>
          <div className="grid grid-cols-12 gap-2 text-center">
            <div>{item.id}</div>
            <div>{item.patient.name}</div>
            <div>{item.priority}</div>
            <div>{item.diagnosis}</div>
            <div>{item.specialty.name}</div>
            <div>{new Date(item.appointmentDate).toLocaleDateString()}</div>
            <div>{item.cid}</div>
            <div>{item.requestingDoctor}</div>
            <div>{item.crm}</div>
            <div>{new Date(item.appointmentDate).toLocaleDateString()}</div>
            <div>{item.status === 'InProgress' && 'Em andamento'}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className=" ">
          <div className="flex gap-3">
            <a href="#">&laquo;</a>
            <a className="" href="#">
              1
            </a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div>
    </div>
  )
}
