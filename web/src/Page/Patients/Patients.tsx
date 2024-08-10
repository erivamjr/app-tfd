import Table from '../../Components/Ux/Table/Table'
import AdminToolbar from '../../Components/Ux/AdminToolbar/AdminToolbar'
import Input from '../../Components/Ux/Input/Input'
import { CiFloppyDisk, CiSearch } from 'react-icons/ci'
import { RiUserAddLine } from 'react-icons/ri'
import Modal from '../../Components/Ux/Modal/Modal'
import { FormEvent, useState } from 'react'
import Label from '../../Components/Ux/Label/Label'
import Button from '../../Components/Ux/Button/Button'
import Loading from '../../Components/Ux/Loading/Loading'

export default function Patients() {
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
    <div>
      <AdminToolbar>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Adicionar novo paciente"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full flex ">
              <div className="border-r-2 flex-1 p-3">
                <div>Dados Pessoais</div>
                <div>
                  <div>
                    <Label label={'Nome'} />
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Digite o nome"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div>
                      <div>
                        <Label label={'CPF'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o CPF"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'CPF'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o CPF"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Telefone 1'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Telefone 1"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Genero '} />
                      </div>
                      <div>
                        <Input type="number" name="name" placeholder="Genero" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <Label label={'SUS'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o numero do SUS"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Nascimento'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Nascimento"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Telefone 2'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Telefone 2"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Nome da mãe'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Nome da mãe"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      icon={isLoading ? <Loading /> : <CiFloppyDisk />}
                      title="Salvar"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 p-3">
                <div>Endereço</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div>
                      <div>
                        <Label label={'Numero'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o numero"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Complemento'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o Complemento"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Estado'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o estado"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>
                        <Label label={'Bairro'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite o Bairro"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <Label label={'Cidade'} />
                      </div>
                      <div>
                        <Input
                          type="number"
                          name="name"
                          placeholder="Digite a cidade"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal>
        <div className="flex p-3 ">
          <div className="w-full flex items-center gap-2">
            <span className="w-full">
              <Input type="text" name="search" placeholder="Pesquisar" />
            </span>
            <span className=" bg-blue-600 text-white hover:bg-blue-500  p-3 rounded cursor-pointer ">
              <CiSearch />
            </span>
          </div>
          <div
            onClick={handleOpenModal}
            className="ml-10 bg-blue-600 text-white hover:bg-blue-500 p-2 rounded flex items-center gap-2 cursor-pointer "
          >
            <span>
              <RiUserAddLine />
            </span>
            <span>Cadastrar</span>
          </div>
        </div>
      </AdminToolbar>
      <Table />
    </div>
  )
}
