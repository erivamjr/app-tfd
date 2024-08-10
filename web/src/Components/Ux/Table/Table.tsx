import { TbReportSearch } from "react-icons/tb"
import { FaRegEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Link } from "react-router-dom"
import usePatients from "../../Hooks/Api/Patiens/Patiens"

export default function Table() {
  const { patients, isLoading, isError } = usePatients()

  if (isLoading) {
    return (
      <div className="bg-green-600 p-3 rounded text-white mt-5">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-600 p-3 rounded text-white mt-5">
        Erro na requisição!
      </div>
    );
  }

  if (!patients || !Array.isArray(patients)) {
    return (
      <div className="bg-red-600 p-3 rounded text-white mt-5">
        Não é uma lista de array.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="">
        <div className="mb-5">
          <div className="grid grid-cols-7 gap-2 rounded bg-blue-600 text-white items-center p-2 text-center">
            <div className="">ID</div>
            <div className="">Nome</div>
            <div className="">CPF</div>
            <div className="">Telefone</div>
            <div className="">Usuario</div>
            <div className="">Data de Cadastro</div>
            <div className="">Configurações</div>
          </div>
        </div>
        {patients.map((item) => (
          <div
            key={item.id}
            className="border mb-4 border-blue-300 p-3 rounded"
          >
            <div className="sm:flex sm:flex-col lg:grid lg:grid-cols-7 lg:gap-2 text-center lg:items-center">
              <div className="">{item.id}</div>
              <div className="">{item.name}</div>
              <div className="">{item.cpf}</div>
              <div className="">{item.phone}</div>
              <div className="">{item.usuario}</div><div className="">
                {new Date(item.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>

              <div className="flex gap-3 items-center justify-center text-2xl text-center">
                <Link to={`/detalhespaciente/${item.id}`}>
                  <div className="bg-yellow-600 hover:bg-yellow-500 text-white rounded p-3">
                    <TbReportSearch />
                  </div>
                </Link>
                <div className="bg-green-600 hover:bg-green-500 rounded text-white p-3">
                  <FaRegEdit />
                </div>
                <div className="bg-red-600 rounded hover:bg-red-500 text-white p-3">
                  <RiDeleteBin6Line />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="">
          <div className="flex gap-3">
            <a href="#">&laquo</a>
            <a className="" href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">&raquo</a>
          </div>
        </div>
      </div>
    </div>
  )
}
