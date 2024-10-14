import { CiFloppyDisk } from 'react-icons/ci'
import { RiUserAddLine } from 'react-icons/ri'
import Input from '../Ux/Input/Input'
import Label from '../Ux/Label/Label'
import Loading from '../Ux/Loading/Loading'
import Modal from '../Ux/Modal/Modal'
import { useState, FormEvent } from 'react'
import api from '../../Api'

export default function RegisterPatients() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
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

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    try {
      setIsLoading(true)
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
    } catch (error) {
      console.error('Error submitting patient data:', error)
    } finally {
      setIsLoading(false)
      handleCloseModal()
    }
  }

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Adicionar novo paciente"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full flex">
            <div className="border-r-2 flex-1 p-3">
              <div>
                <h1 className="text-bold text-2xl pb-2">Dados Pessoais</h1>
              </div>
              <div className="space-y-4">
                <div>
                  <Label label="Nome Completo" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Digite o nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label label="Data de Nascimento" />
                    <Input
                      type="date"
                      name="birthDate"
                      placeholder="Data de Nascimento"
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
                    <Label label="Número do SUS" />
                    <Input
                      type="text"
                      name="susCard"
                      placeholder="Digite o número do SUS"
                      value={susCard}
                      onChange={(e) => setSusCard(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label label="Nome da Mãe" />
                    <Input
                      type="text"
                      name="motherName"
                      placeholder="Nome da Mãe"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label label="Telefone" />
                    <Input
                      type="text"
                      name="phone"
                      placeholder="Telefone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

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

                <div className="flex justify-center">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className=" bg-blue-600 text-white hover:bg-blue-500 py-2 px-8 rounded flex items-center gap-2 cursor-pointer">
                        <CiFloppyDisk size={24} fill="white" />
                        Salvar
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
      <div className="flex justify-end p-3">
        <div
          onClick={handleOpenModal}
          className="ml-10 bg-blue-600 text-white hover:bg-blue-500 p-2 rounded flex items-center gap-2 cursor-pointer"
        >
          <span>
            <RiUserAddLine />
          </span>
          <span>Cadastrar</span>
        </div>
      </div>
    </div>
  )
}
