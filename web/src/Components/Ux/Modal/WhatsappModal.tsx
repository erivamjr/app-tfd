import { useState } from 'react'
import Modal from './Modal'
import { format } from 'date-fns'
import { TypeAppointment } from '../../Hooks/Api/Appointments/TypeAppointments'

interface appointmentModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: TypeAppointment
}
export default function WhatsAppModal({
  isOpen,
  onClose,
  appointment,
}: appointmentModalProps) {
  const [appointmentDate, setAppointmentDate] = useState('')
  const [examOrConsult, setExamOrConsult] = useState('Consulta')

  // 📅 Definir a data limite para retirada da guia (3 dias antes)
  const getLimitDate = (date) => {
    if (!date) return ''
    const limitDate = new Date(date)
    limitDate.setDate(limitDate.getDate() - 3)
    return format(limitDate, 'dd/MM/yyyy')
  }

  // 📤 Função para enviar mensagem formatada no WhatsApp
  const sendWhatsAppMessage = () => {
    if (!appointmentDate || !appointment) {
      alert('Por favor, selecione uma data e um paciente.')
      return
    }

    const formattedDate = format(new Date(appointmentDate), 'dd/MM/yyyy')
    const limitDate = getLimitDate(appointmentDate)
    if (!appointment.patient.phone) {
      alert('O paciente selecionado não possui telefone cadastrado.')
      return
    }
    const phoneNumber = appointment.patient.phone.replace(/\D/g, '')

    const message = `
📢 Setor de Regulação Ambulatorial de Portel 👩🏻‍💻💚

Olá, estamos entrando em contato para informar que foi agendado um *${examOrConsult}* para o paciente *${appointment.patient.name}*, conforme solicitação realizada na Regulação.

📲 Contato cadastrado: ${phoneNumber}

🗓 Data do ${examOrConsult.toLowerCase()}: ${formattedDate}
📍 Local: O responsável pelo paciente deve comparecer ao Setor de Regulação Ambulatorial/TFD para retirar o agendamento.

🔔 *Orientações importantes:*
✅ Comparecer ao setor até o dia *${limitDate}* para retirar a guia de agendamento;
✅ Levar o encaminhamento médico ou comprovante de retorno ambulatorial;
✅ Apresentar os documentos pessoais do paciente (CPF e Cartão SUS).

⚠ *Atenção!*
Pedimos que responda a esta mensagem confirmando ciência do agendamento.

📌 Caso não haja resposta, entenderemos como desistência, e a vaga será disponibilizada para outro paciente.

Agradecemos sua atenção!  
`.trim()

    // Remove caracteres não numéricos
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${phoneNumber}&text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enviar mensagem no WhatsApp"
    >
      <div className="flex flex-col gap-4">
        <label className="font-semibold">Selecione o tipo:</label>
        <select
          value={examOrConsult}
          onChange={(e) => setExamOrConsult(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Consulta">Consulta</option>
          <option value="Exame">Exame</option>
        </select>

        <label className="font-semibold">Data do Agendamento:</label>
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          onClick={sendWhatsAppMessage}
          className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Enviar Mensagem no WhatsApp
        </button>
      </div>
    </Modal>
  )
}
