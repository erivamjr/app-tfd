import { AxiosError } from 'axios'
import { useState, FormEvent } from 'react'
import { CiFloppyDisk } from 'react-icons/ci'
import { IoReturnDownBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import api from '../../Api'
import Label from '../Ux/Label/Label'
import Loading from '../Ux/Loading/Loading'
import Input from '../Ux/Input/Input'
import AdminToolbar from '../Ux/AdminToolbar/AdminToolbar'

export default function RegisterPatients() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [rg, setRg] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [susCard, setSusCard] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')
  const [motherName, setMotherName] = useState<string>('')
  const [number, setNumber] = useState<string>('')
  const [complement, setComplement] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await api.post('patients', {
        name,
        gender,
        cpf,
        rg,
        address,
        number,
        complement,
        district,
        city,
        state,
        zipCode,
        phone,
        susCard,
        birthDate,
        motherName,
        active: true,
      })

      alert('Paciente cadastrado com sucesso!')
      navigate('/patients')
      handleResetFields()
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Erro ao registrar o paciente:', axiosError)
      const { status } = axiosError.request

      if (status === 409) {
        alert('Paciente já cadastrado!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  function handleResetFields() {
    setName('')
    setCpf('')
    setRg('')
    setPhone('')
    setGender('')
    setSusCard('')
    setBirthDate('')
    setMotherName('')
    setNumber('')
    setComplement('')
    setState('')
    setDistrict('')
    setCity('')
    setZipCode('')
    setAddress('')
  }

  return (
    <div className="shadow-lg mt-2 border-gray-800 p-3 bg-white">
      <AdminToolbar>
        <div className="rounded p-4 flex justify-between items-center bg-blue-600 text-white">
          <div className="text-2xl font-bold flex-1 text-center">
            Cadastrar Paciente
          </div>
          <div className="flex gap-3">
            <button
              className="bg-white text-blue-600 p-3 rounded shadow-md hover:bg-gray-100"
              onClick={() => navigate('/patients')}
            >
              <IoReturnDownBack />
            </button>
          </div>
        </div>
      </AdminToolbar>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full flex flex-wrap md:flex-nowrap">
          <div className="flex-1 p-3">
            <h2 className="text-bold text-xl pb-2">Dados Pessoais</h2>
            <div className="space-y-4">
              <Label label="Nome Completo" />
              <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label label="Data de Nascimento" />
                  <Input
                    type="date"
                    name="birthDate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Gênero" />
                  <Input
                    type="text"
                    name="gender"
                    placeholder="Gênero"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="CPF" />
                  <Input
                    type="text"
                    name="cpf"
                    placeholder="Digite o CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="RG" />
                  <Input
                    type="text"
                    name="rg"
                    placeholder="Digite o RG"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Cartão do SUS" />
                  <Input
                    type="text"
                    name="susCard"
                    placeholder="Digite o número do cartão do SUS"
                    value={susCard}
                    onChange={(e) => setSusCard(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Nome da Mãe" />
                  <Input
                    type="text"
                    name="motherName"
                    placeholder="Digite o nome da mãe"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Telefone" />
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Digite o telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <h2 className="text-bold text-xl pb-2">Endereço</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <Label label="Endereço" />
                  <Input
                    type="text"
                    name="address"
                    placeholder="Digite o endereço"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Número" />
                  <Input
                    type="text"
                    name="number"
                    placeholder="Digite o número"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Complemento" />
                  <Input
                    type="text"
                    name="complement"
                    placeholder="Digite o complemento"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Bairro" />
                  <Input
                    type="text"
                    name="district"
                    placeholder="Digite o bairro"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Cidade" />
                  <Input
                    type="text"
                    name="city"
                    placeholder="Digite a cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="Estado" />
                  <Input
                    type="text"
                    name="state"
                    placeholder="Digite o estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div>
                  <Label label="CEP" />
                  <Input
                    type="text"
                    name="zipCode"
                    placeholder="Digite o CEP"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-8 rounded flex items-center gap-2 cursor-pointer">
                <CiFloppyDisk size={24} fill="white" />
                Salvar
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
