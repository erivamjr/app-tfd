
import AdminToolbar from '../../Components/Ux/AdminToolbar/AdminToolbar';
import Input from '../../Components/Ux/Input/Input';
import { CiFloppyDisk, CiSearch } from 'react-icons/ci';
import { RiUserAddLine } from 'react-icons/ri';
import Modal from '../../Components/Ux/Modal/Modal';
import { useState } from 'react';
import Label from '../../Components/Ux/Label/Label';
import Button from '../../Components/Ux/Button/Button';
import Table from '../../Components/CompoRequest/Table/Table';

export default function Request() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefaul()
  }
  return (
    <div>
      <AdminToolbar>
        <Modal isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Solicitação">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='w-full flex flex-wrap '>
              <div className='border-r-2 flex-1 p-3 '>
                <div>Dados Pessoais</div>
                <div>
                  <div><Label label={'Nome'} /></div>
                  <div><Input type="text" name="name" placeholder="Digite o nome" /></div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <div>
                      <div><Label label={'Diagnóstico'} /></div>
                      <div><Input type="number" name="deiagnostico" placeholder="Diagnóstico" /></div>
                    </div>
                    <div>
                      <div><Label label={'Medico'} /></div>
                      <div><Input type="number" name="medico" placeholder="Medico" /></div>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div><Label label={'CID'} /></div>
                      <div><Input type="number" name="cid" placeholder="Digite o CID" /></div>
                    </div>
                    <div>
                      <div><Label label={'CRM'} /></div>
                      <div><Input type="number" name="crm" placeholder="CRM" /></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex-1 p-3'>
                <div>Processo</div>
                <div className='grid grid-cols-2 gap-2'>
                  <div>
                    <div>
                      <div><Label label={'Especialidade'} /></div>
                      <div><Input type="number" name="especialidade" placeholder="Especialidade" /></div>
                    </div>
                    <div>
                      <div><Label label={'Código da Solicitação'} /></div>
                      <div><Input type="number" name="CódigoDaSolicitacao" placeholder="Código da Solicitação" /></div>
                    </div>
                    <div>
                      <div><Label label={'Status'} /></div>
                      <select name="status" id="status" className='border-2 border-gray-300 rounded-md p-2'>
                        <option value="1">Aguardando</option>
                        <option value="2">Em andamento</option>
                        <option value="3">Finalizado</option>
                      </select>
                    </div>
                    <div>
                      <div><Label label={'Observações'} /></div>
                      <textarea name="observacao" id="observacao" cols="25" rows="10" className='border-2 border-gray-300 rounded-md p-2'></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button icon={<CiFloppyDisk />} title={'Salvar'} />
              </div>
            </div>
          </form>
        </Modal>
        <div className='flex p-3 '>
          <div className='w-full flex items-center gap-2'>
            <span className='w-full'>
              <Input type="text" name="search" placeholder="Pesquisar" />
            </span>
            <span className=' bg-blue-600 text-white hover:bg-blue-500  p-3 rounded cursor-pointer '>
              <CiSearch />
            </span>
          </div>
          <div onClick={handleOpenModal} className=' w-64 ml-10 bg-blue-600 text-white hover:bg-blue-500 p-2 rounded flex items-center gap-2 cursor-pointer '>
            <span>
              <RiUserAddLine />
            </span>
            <span>
              Nova Solicitação
            </span>
          </div>
        </div>
      </AdminToolbar>
      <Table />
    </div>
  )
}