import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/DataContext'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaRegEdit } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import Input from '../Ux/Input/Input'
import { LiaNotesMedicalSolid } from 'react-icons/lia'
import { SpecialtyProps } from '../Hooks/Api/Appointments/TypeAppointments'
import ModalSpecialties from './ModalSpecialties'

export function CompoSpecialties() {
  const { specialties, addSpecialty, updateSpecialty, deleteSpecialty } =
    useContext(DataContext)
  const [search, setSearch] = useState<string>('')
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [specialtyName, setSpecialtyName] = useState<string>('')
  const [modalAction, setModalAction] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState(
    {} as SpecialtyProps,
  )
  const [filteredSpecialties, setFilteredSpecialties] = useState<
    SpecialtyProps[]
  >([])

  const openModal = (action, specialty?: SpecialtyProps) => {
    setIsModalOpen(true)
    setModalAction(action)
    if (specialty) {
      setSelectedSpecialty(specialty)

      if (action === 'edit') {
        setSpecialtyName(specialty.name)
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSpecialtyName('')
  }

  const handleAddSpecialty = () => {
    setSpecialtyName('')
    openModal('add')
  }

  const handleEditSpecialty = () => {
    updateSpecialty(selectedSpecialty.id, specialtyName)
    closeModal()
  }

  const handleDeleteSpecialty = () => {
    deleteSpecialty(selectedSpecialty.id)
    closeModal()
  }

  const handleConfirmAddSpecialty = () => {
    addSpecialty(specialtyName) // Adiciona a nova especialidade com o nome atual
    closeModal() // Fecha o modal após a adição
  }

  useEffect(() => {
    setFilteredSpecialties(specialties)
  }, [specialties])

  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setSearch(searchValue)
    filterSpecialties(searchValue)
  }

  const filterSpecialties = (searchValue) => {
    const lowerCaseSearch = searchValue.toLowerCase()
    const filtered = specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(lowerCaseSearch),
    )
    setFilteredSpecialties(filtered)
  }

  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-end mb-4">
        <div
          onClick={() => handleAddSpecialty()}
          className="ml-10 bg-blue-500 text-white hover:bg-blue-700 p-2 rounded flex items-center gap-2 cursor-pointer"
        >
          <span className="hidden md:block">Adicionar Especialidade</span>
          <LiaNotesMedicalSolid />
        </div>
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

      {filteredSpecialties.map((specialty) => (
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
            modalAction === 'add' || modalAction === 'edit' ? (
              <Input
                type="text"
                name="name"
                value={specialtyName}
                onChange={(e) => setSpecialtyName(e.target.value)}
                placeholder="Digite o nome da especialidade"
              />
            ) : (
              <p>
                Tem certeza que deseja excluir a especialidade &quot;
                {selectedSpecialty.name}&quot; ?
              </p>
            )
          }
          confirmAction={
            modalAction === 'add'
              ? handleConfirmAddSpecialty
              : modalAction === 'edit'
                ? handleEditSpecialty
                : handleDeleteSpecialty
          }
          confirmText={
            modalAction === 'add'
              ? 'Adicionar'
              : modalAction === 'edit'
                ? 'Salvar'
                : 'Excluir'
          }
        />
      )}
    </section>
  )
}
