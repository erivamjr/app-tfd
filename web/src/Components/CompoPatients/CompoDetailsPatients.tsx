import { useParams } from "react-router-dom";
import AdminToolbar from "../Ux/AdminToolbar/AdminToolbar";
import { ImPrinter } from "react-icons/im";
import { IoReturnDownBack } from "react-icons/io5";
import Container from "../Ux/Container/Container";
import DetailsTable from "./DetailsTable";


export default function DetailsPatients() {
  const { id } = useParams()
  return <div>
    Details {id}
    <AdminToolbar>
      <div className="p-2 flex">
        <div className=" text-[#857900] text-2xl flex flex-1 items-center justify-center">
          Detalhes do Paciente
        </div>
        <div className="flex gap-3">
          <div className="bg-[#FFF58A] p-3 text-2xl rounded">
            <ImPrinter />
          </div>
          <div className="bg-[#FFF58A] p-3 text-2xl rounded">
            <IoReturnDownBack />
          </div>
        </div>

      </div>
    </AdminToolbar>
    <Container >
      <div>
        <AdminToolbar>
          <div className="p-1 text-[#857900]">
            Dados Pessoais
          </div>
        </AdminToolbar>
        <div className="grid grid-cols-2 w-full p-3">
          <div className="flex flex-col gap-2">
            <span>Nome: </span>
            <span>CPF: </span>
            <span>RG: </span>
            <span>Cartão SUS: </span>
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <span>Telefone: </span>
              <span>Mãe: </span>
              <span>Logradouro: </span>
              <span>Cidade: </span>
            </div>
          </div>
        </div>
        <AdminToolbar>
          <div className="p-1 text-[#857900]">
            Histórico
          </div>
        </AdminToolbar>
      </div>
      <DetailsTable />
    </Container>
  </div>;
}