import { useContext, useState, useMemo } from 'react'
import { DataContext } from '../Context/DataContext'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import { LiaNotesMedicalSolid } from 'react-icons/lia'
import Input from '../Ux/Input/Input'
import ModalSpecialties from './ModalSpecialties'
import { SpecialtyProps } from '../Hooks/Api/Appointments/TypeAppointments'
import { Pagination } from '../Ux/Table/Pagination '

export function CompoSpecialties() {
  const { specialties, addSpecialty, updateSpecialty, deleteSpecialty } =
    useContext(DataContext)

  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalAction, setModalAction] = useState<'add' | 'edit' | 'delete'>(
    'add',
  )
  const [specialtyName, setSpecialtyName] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<SpecialtyProps | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const specialtiesPerPage = 5

  const filteredSpecialties = useMemo(() => {
    const lowerCaseSearch = search.toLowerCase()
    return specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(lowerCaseSearch),
    )
  }, [search, specialties])

  const currentSpecialties = useMemo(() => {
    const startIndex = (currentPage - 1) * specialtiesPerPage
    const endIndex = startIndex + specialtiesPerPage
    return filteredSpecialties.slice(startIndex, endIndex)
  }, [filteredSpecialties, currentPage])

  const totalPages = useMemo(
    () => Math.ceil(filteredSpecialties.length / specialtiesPerPage),
    [filteredSpecialties],
  )

  const openModal = (
    action: 'add' | 'edit' | 'delete',
    specialty?: SpecialtyProps,
  ) => {
    setModalAction(action)
    setIsModalOpen(true)
    if (specialty) {
      setSelectedSpecialty(specialty)
      if (action === 'edit') setSpecialtyName(specialty.name)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSpecialtyName('')
    setSelectedSpecialty(null)
  }

  const handleConfirmAction = () => {
    if (modalAction === 'add') {
      addSpecialty(specialtyName)
    } else if (modalAction === 'edit' && selectedSpecialty) {
      updateSpecialty(selectedSpecialty.id, specialtyName)
    } else if (modalAction === 'delete' && selectedSpecialty) {
      deleteSpecialty(selectedSpecialty.id)
    }
    closeModal()
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal('add')}
          className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2 rounded flex items-center gap-2 cursor-pointer"
        >
          <span className="hidden md:block">Adicionar Especialidade</span>
          <LiaNotesMedicalSolid />
        </button>
      </div>

      <div className="mb-5 flex flex-1 items-center space-x-2">
        <Input
          type="text"
          name="pesquisar"
          placeholder="Pesquisar"
          value={search}
          onChange={handleSearchChange}
        />
        <button className="flex gap-2 bg-blue-500 p-2 text-white rounded hover:bg-blue-700">
          <CiSearch size={24} />
          <p>Buscar</p>
        </button>
      </div>

      {currentSpecialties.map((specialty) => (
        <div
          key={specialty.id}
          className="flex flex-row items-center justify-between p-2 border border-gray-300 rounded-md hover:bg-gray-100"
        >
          <h2 className="ml-2">{specialty.name}</h2>
          <div className="flex gap-2">
            <button
              className="text-white bg-green-500 hover:bg-green-700 flex gap-3 items-center justify-center text-2xl rounded p-3"
              onClick={() => openModal('edit', specialty)}
            >
              <FaRegEdit />
            </button>
            <button
              className="text-white bg-red-500 hover:bg-red-700 flex gap-3 items-center justify-center text-2xl rounded p-3"
              onClick={() => openModal('delete', specialty)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <ModalSpecialties
          isOpen={isModalOpen}
          onClose={closeModal}
          title={
            modalAction === 'add'
              ? 'Adicionar Especialidade'
              : modalAction === 'edit'
                ? 'Editar Especialidade'
                : 'Excluir Especialidade'
          }
          content={
            modalAction === 'delete' ? (
              <p>
                Tem certeza que deseja excluir a especialidade &quot;
                {selectedSpecialty?.name}&quot;?
              </p>
            ) : (
              <Input
                type="text"
                name="name"
                value={specialtyName}
                onChange={(e) => setSpecialtyName(e.target.value)}
                placeholder="Digite o nome da especialidade"
              />
            )
          }
          confirmAction={handleConfirmAction}
          confirmText={
            modalAction === 'add'
              ? 'Adicionar'
              : modalAction === 'edit'
                ? 'Salvar'
                : 'Excluir'
          }
          isDeleteAction={modalAction === 'delete'}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  )
}
