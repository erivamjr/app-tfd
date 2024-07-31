
export default function DetailsTable() {
  const dadosMedicos = [
    {
      id: 11374927,
      Usuario: "Taynara",
      Prioridade: "Normal",
      Diagnostico: "Sarampo",
      EspecialidadesExames: "Pediatria",
      Solicitacao: "20/10/2023",
      CID: "123",
      Medico: "Kelly",
      CRM: "12345",
      Status: "Finalizado",
      Agendamento: "22/10/2023",
      FinalizadoData: "25/10/2023",
      Obs: "Realizado"
    },
    {
      id: 11374927,
      Usuario: "Taynara",
      Prioridade: "Normal",
      Diagnostico: "Catapora",
      EspecialidadesExames: "Pediatria",
      Solicitacao: "10/11/2023",
      CID: "123",
      Medico: "Kelly",
      CRM: "12345",
      Status: "Finalizado",
      Agendamento: "22/12/2023",
      FinalizadoData: "25/12/2023",
      Obs: "Nao foi"
    },
    {
      id: 11374927,
      Usuario: "Luana",
      Prioridade: "Gestante",
      Diagnostico: "Prevencao",
      EspecialidadesExames: "Ginecologista",
      Solicitacao: "28/09/2023",
      CID: "123",
      Medico: "Felipe",
      CRM: "65465",
      Status: "Andamento",
      Agendamento: "",
      FinalizadoData: "",
      Obs: ""
    }
  ];

  return (
    <div className="mt-6">
      <div className=" ">
        <div className="mb-5 ">
          <div className="grid grid-cols-12 gap-2 rounded p-2 text-center ">
            <div className="">ID</div>
            <div className="">Usuario</div>
            <div className="">Prioridade</div>
            <div className="">Diagnostico</div>
            <div className="">Exame</div>
            <div className="">Solicitação</div>
            <div className="">CID</div>
            <div className="">Médico</div>
            <div className="">CRM</div>
            <div className="">Agendamento</div>
            <div className="">Status</div>
          </div>
        </div>
        {dadosMedicos.map((item) => (
          <div className="border mb-4 border-[#008BAD] p-3 rounded" key={item.id}>
            <div className="grid grid-cols-12 gap-2 text-center">
              <div className="">{item.id}</div>
              <div className="">{item.Usuario}</div>
              <div className="">{item.Prioridade}</div>
              <div className="">{item.Diagnostico}</div>
              <div className="">{item.EspecialidadesExames}</div>
              <div className="">{item.Solicitacao}</div>
              <div className="">{item.CID}</div>
              <div className="">{item.Medico}</div>
              <div className="">{item.CRM}</div>
              <div className="">{item.Agendamento}</div>
              <div className="">{item.Status}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className=" ">
          <div className="flex gap-3">
            <a href="#">&laquo;</a>
            <a className="" href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">&raquo;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
