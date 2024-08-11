import PatientsTable from '../../Components/CompoPatients/PatientsTable'
import RegisterPatients from '../../Components/CompoPatients/RegisterPatient'

export default function Patients() {
  return (
    <div>
      <RegisterPatients />
      <PatientsTable />
    </div>
  )
}
