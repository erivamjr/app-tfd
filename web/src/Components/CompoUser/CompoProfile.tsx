import React, { useContext, useState } from 'react'
import api from '../../Api'
import { formatCPF } from '../../utils/utils'
import { DataContext } from '../Context/DataContext'

// interface CompoProfileProps {
//   id: string
//   name: string
//   email: string
//   phone: string
//   cpf: string
//   role: string
//   workLocation: string
//   profileUrlImage: string
// }

interface UpdateProfileProps {
  name: string
  email: string
  phone: string
  cpf: string
  role: string
  workLocation: string
  profileUrlImage?: string
}

const CompoProfile = ({
  id,
  name,
  email,
  phone,
  cpf,
  role,
  workLocation,
  profileUrlImage,
}) => {
  const { updateProfile } = useContext(DataContext)
  const [image, setImage] = useState(profileUrlImage)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    id,
    name,
    email,
    phone,
    cpf,
    role,
    workLocation,
    profileUrlImage,
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = () => {
    setIsEditing(true) // Ativa o modo de edição
  }

  const handleSave = async () => {
    const updatData: UpdateProfileProps = {
      name: formData?.name?.trim(),
      email: formData?.email?.trim(),
      phone: formData?.phone?.trim(),
      cpf: formatCPF(formData.cpf)?.trim(),
      role: formData?.role?.trim(),
      workLocation: formData?.workLocation?.trim(),
      profileUrlImage: formData?.profileUrlImage?.trim(),
    }

    try {
      await updateProfile(id, updatData)

      // Caso o update seja bem-sucedido, defina isEditing como falso
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao atualizar dados:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      id,
      name,
      email,
      phone,
      cpf,
      role,
      workLocation,
      profileUrlImage,
    })
  }

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/path/to/delete/endpoint/${id}`)
      console.log('Perfil deletado com sucesso:', response.data)
      // Após a exclusão, você pode redirecionar o usuário ou realizar outra ação
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center md:flex-row">
        <div className="flex flex-col items-center flex-shrink-0 mb-4 md:mb-0">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
          />
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300 mt-2"
          >
            Mudar Foto
          </label>
        </div>

        <div className="md:ml-6 w-full md:w-3/4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {formData.name}
          </h1>
          <p className="text-gray-600">{formData.role}</p>
          <p className="text-gray-600">{formData.workLocation}</p>
          <div className="mt-4 space-y-2">
            <div>
              <label className="font-semibold text-gray-600">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-600">Telefone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-600">CPF:</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-600">
                Local de Trabalho:
              </label>
              <input
                type="text"
                name="workLocation"
                value={formData.workLocation}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border border-gray-300 rounded-md ${isEditing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 justify-center">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Deletar Conta
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompoProfile
