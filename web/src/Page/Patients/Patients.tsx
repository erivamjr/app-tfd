
import Table from '../../Components/Ux/Table/Table';
import AdminToolbar from '../../Components/Ux/AdminToolbar/AdminToolbar';
import Input from '../../Components/Ux/Input/Input';
import { CiSearch } from 'react-icons/ci';
import { RiUserAddLine } from 'react-icons/ri';

export default function Patients() {
  return (
    <div>
      <AdminToolbar>
        <div className='flex p-3 '>
          <div className='w-full flex items-center gap-2'>
            <span className='w-full'>
              <Input type="text" name="search" placeholder="Pesquisar" />
            </span>
            <span className='bg-[#FFF58A] p-3 rounded cursor-pointer '>
              <CiSearch />
            </span>
          </div>
          <div className='ml-10 bg-[#FFF58A] p-2 rounded flex items-center gap-2 cursor-pointer '>
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