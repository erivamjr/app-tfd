import { CiFloppyDisk, CiSearch } from 'react-icons/ci'
import { RiUserAddLine } from 'react-icons/ri'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import Button from '../Ux/Button/Button'
import Input from '../Ux/Input/Input'
import Label from '../Ux/Label/Label'
import Loading from '../Ux/Loading/Loading'
import Modal from '../Ux/Modal/Modal'
import { FormEvent, useState } from 'react'

export default function CreateRequest() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <AdminToolbar>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Nova Solicitação"
      >
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="flex flex-col md:flex-row ">
            <div className="flex-1 p-4 rounded-lg">
              <div className="text-lg font-semibold mb-2">Dados Pessoais</div>
              <div>
                <Label label="Nome" />
                <Input type="text" name="name" placeholder="Digite o nome" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label label="Diagnóstico" />
                  <Input
                    type="text"
                    name="diagnostico"
                    placeholder="Diagnóstico"
                  />
                  <Label label="Médico" />
                  <Input type="text" name="medico" placeholder="Médico" />
                </div>
                <div>
                  <Label label="CID" />
                  <Input type="text" name="cid" placeholder="Digite o CID" />
                  <Label label="CRM" />
                  <Input type="text" name="crm" placeholder="CRM" />
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 rounded-lg">
              <div className="text-lg font-semibold mb-2">Processo</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label label="Especialidade" />
                  <Input
                    type="text"
                    name="especialidade"
                    placeholder="Especialidade"
                  />
                  <Label label="Código da Solicitação" />
                  <Input
                    type="text"
                    name="codigoDaSolicitacao"
                    placeholder="Código da Solicitação"
                  />
                  <Label label="Status" />
                  <select
                    name="status"
                    id="status"
                    className="border rounded-md p-2 w-full"
                  >
                    <option value="">Selecionar</option>
                    <option value="1">Aguardando</option>
                    <option value="2">Em andamento</option>
                    <option value="3">Finalizado</option>
                  </select>
                  <Label label="Observações" />
                  <textarea
                    name="observacao"
                    id="observacao"
                    cols={30}
                    rows={6}
                    className="border rounded-md p-2 w-full"
                    placeholder="Observações"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              icon={isLoading ? <Loading /> : <CiFloppyDisk />}
              title="Salvar"
              className="bg-blue-600 text-white hover:bg-blue-500"
            />
          </div>
        </form>
      </Modal>
      <div className="flex p-3 space-x-4">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            type="text"
            name="search"
            placeholder="Pesquisar"
            className="flex-1"
          />
          <button className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded">
            <CiSearch />
          </button>
        </div>
        <div
          onClick={handleOpenModal}
          className="bg-blue-600 text-white hover:bg-blue-500 p-3 rounded flex items-center space-x-2 cursor-pointer"
        >
          <RiUserAddLine />
          <span>Nova Solicitação</span>
        </div>
      </div>
    </AdminToolbar>
  )
}
