import { useState, useEffect } from 'react'
import { Patient } from '../../Hooks/Api/Patiens/TypePatiens'
import api from '../../../Api'

interface AutocompleteProps {
  placeholder?: string
  onSelect: (patient: Patient) => void
}

export default function Autocomplete({
  placeholder,
  onSelect,
}: AutocompleteProps) {
  const [search, setSearch] = useState('')
  const [suggestedPatients, setSuggestedPatients] = useState<Patient[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Função para buscar pacientes na API
  const searchPatients = async (searchTerm: string) => {
    try {
      setIsSearching(true)
      const response = await api.get<Patient[]>(
        `/patients/search?name=${searchTerm}`,
      )
      setSuggestedPatients(response.data)
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error)
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (search.trim()) {
      searchPatients(search)
    } else {
      setSuggestedPatients([])
    }
  }, [search])

  // Função para selecionar um paciente
  const handleSelect = (patient: Patient) => {
    setSearch(patient.name) // Define o nome no campo de busca
    onSelect(patient) // Retorna o paciente selecionado
    setSuggestedPatients([])
    setIsFocused(false) // Fecha a lista de sugestões
  }

  return (
    <div className="relative w-full">
      {/* Campo de busca */}
      <input
        type="text"
        placeholder={placeholder || 'Digite para buscar'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
      />

      {/* Lista de sugestões */}
      {isFocused && suggestedPatients.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {isSearching ? (
            <li className="p-2 text-gray-500">Carregando...</li>
          ) : (
            suggestedPatients.map((patient) => (
              <li
                key={patient.id}
                onClick={() => handleSelect(patient)}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {patient.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
