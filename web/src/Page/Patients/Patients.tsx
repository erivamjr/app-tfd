import PatientsTable from '../../Components/CompoPatients/PatientsTable'
import RegisterPatients from '../../Components/CompoPatients/RegisterPatient'
import Container from '../../Components/Ux/Container/Container'

export default function Patients() {
  return (
    <Container>
      <RegisterPatients />
      <PatientsTable />
    </Container>
  )
}
