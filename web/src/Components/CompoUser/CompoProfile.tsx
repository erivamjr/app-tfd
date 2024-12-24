import React, { useState } from 'react'

interface CompoProfileProps {
  name: string
  email: string
  phone: string
  cpf: string
  role: string
  workLocation: string
  profileUrlImage: string
}

const CompoProfile: React.FC<CompoProfileProps> = ({
  name,
  email,
  phone,
  cpf,
  role,
  workLocation,
  profileUrlImage,
}) => {
  const [image, setImage] = useState(profileUrlImage)
  const [isEditing, setIsEditing] = useState(false) // Controla se os campos estão em modo de edição
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    cpf,
    role,
    workLocation,
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

  const handleSave = () => {
    setIsEditing(false) // Desativa o modo de edição
    // Aqui você pode implementar a lógica para salvar as alterações, como uma chamada API
    console.log('Dados salvos', formData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      // Reseta os dados para o valor inicial
      name,
      email,
      phone,
      cpf,
      role,
      workLocation,
    })
  }

  const handleDelete = () => {
    // Lógica para deletar conta
    console.log('Conta deletada')
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
