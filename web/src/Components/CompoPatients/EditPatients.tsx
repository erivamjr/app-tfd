import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../Ux/Input/Input'
import Alert from '../Ux/Alert/Alert'
import usePatients from '../Hooks/Api/Patiens/Patients'
import Container from '../Ux/Container/Container'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'
import { IoReturnDownBack } from 'react-icons/io5'
import Label from '../Ux/Label/Label'
import api from '../../Api'

export default function EditPatient() {
  const { id } = useParams<{ id: string }>()
  const { patients, isLoading, isError } = usePatients()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    rg: '',
    phone: '',
    gender: '',
    susCard: '',
    birthDate: '',
    motherName: '',
    address: '',
    number: '',
    complement: '',
    state: '',
    district: '',
    city: '',
    zipCode: '',
  })

  useEffect(() => {
    if (patients) {
      const patient = patients.find((p) => p.id === id)
      if (patient) {
        setFormData({
          name: patient.name || '',
          cpf: patient.cpf || '',
          rg: patient.rg || '',
          phone: patient.phone || '',
          gender: patient.gender || '',
          susCard: patient.susCard || '',
          birthDate: patient.birthDate ? patient.birthDate.toString() : '',
          motherName: patient.motherName || '',
          address: patient.address || '',
          number: patient.number ? String(patient.number) : '',
          complement: patient.complement || '',
          state: patient.state || '',
          district: patient.district || '',
          city: patient.city || '',
          zipCode: patient.zipCode?.toString() ?? '',
        })
      }
    }
  }, [patients, id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.patch(`/patients/${id}`, formData)
      alert('Paciente atualizado com sucesso')
      navigate('/pacientes')
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error)
      alert('Erro ao atualizar o paciente')
    }
  }

  if (isLoading) return <Alert type="success" message="Carregando..." />
  if (isError) return <Alert type="error" message="Erro ao carregar dados!" />

  return (
    <div>
      <AdminToolbar>
        <div className="p-2 flex">
          <div className="font-bold text-black text-2xl flex-1 text-center">
            Editar Paciente
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/pacientes')}
              className="bg-blue-600 text-white p-3 text-2xl rounded"
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>

      <Container>
        <form onSubmit={handleSubmit} className="grid gap-2 p-5">
          <Label label="Nome" />
          <Input
            type="text"
            placeholder="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="md:grid grid-cols-3 gap-2">
            <div>
              <Label label="CPF" />
              <Input
                type="text"
                placeholder="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label label="RG" />
              <Input
                type="text"
                placeholder="RG"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="Data de Nascimento" />
              <Input
                type="date"
                placeholder="Data de Nascimento"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-3 gap-2">
            <div>
              <Label label="Número do SUS" />
              <Input
                type="text"
                placeholder="Número do SUS"
                name="susCard"
                value={formData.susCard}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label label="Telefone" />
              <Input
                type="text"
                placeholder="Telefone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label label="Gênero" />
              <Input
                type="text"
                placeholder="Gênero"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
          </div>

          <Label label="Nome da Mãe" />
          <Input
            type="text"
            placeholder="Nome da Mãe"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />

          <div className="md:grid grid-cols-5 gap-2">
            <div className="col-span-3">
              <Label label="Endereço" />
              <Input
                type="text"
                placeholder="Endereço"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="Número" />
              <Input
                type="text"
                placeholder="Número"
                name="number"
                value={formData.number}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label label="Complemento" />
              <Input
                type="text"
                placeholder="Complemento"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="md:grid grid-cols-4 gap-2">
            <div>
              <Label label="Bairro" />
              <Input
                type="text"
                placeholder="Bairro"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label label="Cidade" />
              <Input
                type="text"
                placeholder="Cidade"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label label="Estado" />
              <Input
                type="text"
                placeholder="Estado"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label label="CEP" />
              <Input
                type="text"
                placeholder="CEP"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Salvar Alterações
          </button>
        </form>
      </Container>
    </div>
  )
}
