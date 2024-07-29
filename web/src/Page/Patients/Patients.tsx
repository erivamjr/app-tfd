
import Table from '../../Components/Ux/Table/Table';
import AdminToolbar from '../../Components/Ux/AdminToolbar/AdminToolbar';
import Input from '../../Components/Ux/Input/Input';
import { CiSearch } from 'react-icons/ci';
import { RiUserAddLine } from 'react-icons/ri';
import Modal from '../../Components/Ux/Modal/Modal';
import { useState } from 'react';

export default function Patients() {
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
          title="Adicionar novo paciente">
          <form onSubmit={handleSubmit} className="space-y-4">
          </form>
        </Modal>
        <div className='flex p-3 '>
          <div className='w-full flex items-center gap-2'>
            <span className='w-full'>
              <Input type="text" name="search" placeholder="Pesquisar" />
            </span>
            <span className='bg-[#FFF58A] p-3 rounded cursor-pointer '>
              <CiSearch />
            </span>
          </div>
          <div onClick={handleOpenModal} className='ml-10 bg-[#FFF58A] p-2 rounded flex items-center gap-2 cursor-pointer '>
            <span>
              <RiUserAddLine />
            </span>
            <span>
              Cadastrar
            </span>
          </div>
        </div>
      </AdminToolbar>
      <Table />
    </div>
  )
}