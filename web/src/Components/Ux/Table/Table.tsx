import { TbReportSearch } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function Table() {
  const users = [
    {
      id: 1,
      nome: 'João Silva',
      cpf: '123.456.789-00',
      telefone: '(11) 91234-5678',
      usuario: 'joao.silva',
      dataDeCadastro: '2024-01-15',
      configuracoes: { theme: 'dark', notifications: true }
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      telefone: '(21) 92345-6789',
      usuario: 'maria.oliveira',
      dataDeCadastro: '2024-02-20',
      configuracoes: { theme: 'light', notifications: false }
    },
    {
      id: 3,
      nome: 'Carlos Pereira',
      cpf: '123.123.123-12',
      telefone: '(31) 93456-7890',
      usuario: 'carlos.pereira',
      dataDeCadastro: '2024-03-10',
      configuracoes: { theme: 'dark', notifications: true }
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cpf: '321.321.321-21',
      telefone: '(41) 94567-8901',
      usuario: 'ana.costa',
      dataDeCadastro: '2024-04-05',
      configuracoes: { theme: 'light', notifications: true }
    },
    {
      id: 5,
      nome: 'Lucas Fernandes',
      cpf: '456.456.456-45',
      telefone: '(51) 95678-9012',
      usuario: 'lucas.fernandes',
      dataDeCadastro: '2024-05-25',
      configuracoes: { theme: 'dark', notifications: false }
    },
    {
      id: 6,
      nome: 'Bruna Souza',
      cpf: '789.789.789-78',
      telefone: '(61) 96789-0123',
      usuario: 'bruna.souza',
      dataDeCadastro: '2024-06-15',
      configuracoes: { theme: 'light', notifications: true }
    },
    {
      id: 7,
      nome: 'Pedro Santos',
      cpf: '147.258.369-00',
      telefone: '(71) 97890-1234',
      usuario: 'pedro.santos',
      dataDeCadastro: '2024-07-05',
      configuracoes: { theme: 'dark', notifications: true }
    },
    {
      id: 8,
      nome: 'Juliana Almeida',
      cpf: '963.852.741-00',
      telefone: '(81) 98901-2345',
      usuario: 'juliana.almeida',
      dataDeCadastro: '2024-08-25',
      configuracoes: { theme: 'light', notifications: false }
    }
  ];

  console.log(users);



  return (
    <div className="mt-6">
      <div className=" ">
        <div className="mb-5 ">
          <div className="grid grid-cols-7 gap-2 rounded bg-[#5CDEFF] p-2 text-center ">
            <div className="">ID</div>
            <div className="">Nome</div>
            <div className="">CPF</div>
            <div className="">Telefone</div>
            <div className="">Usuario</div>
            <div className="">Data de Cadastro</div>
            <div className="">Configuraçoes</div>
          </div>
        </div>
        {users.map((item) => (
          <div className="border mb-4 border-[#008BAD] p-3 rounded">
            <div className="grid grid-cols-7 gap-2 text-center">
              <div className="">{item.id}</div>
              <div className="">{item.nome}</div>
              <div className="">{item.cpf}</div>
              <div className="">{item.telefone}</div>
              <div className="">{item.usuario}</div>
              <div className="">{item.dataDeCadastro}</div>
              <div className="grid grid-cols-3 text-2xl text-center">
                <div><TbReportSearch /></div>
                <div><FaRegEdit /></div>
                <div><RiDeleteBin6Line /></div>
              </div>
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
            <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
        </div>
      </div>
    </div>
  )
}