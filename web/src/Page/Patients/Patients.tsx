import PatientsTable from '../../Components/CompoPatients/PatientsTable'
import RegisterPatients from '../../Components/CompoPatients/RegisterPatient'
import Container from '../../Components/Ux/Container/Container'
import Title from '../../Components/Ux/Title/Title'

export default function Patients() {
  return (
    <div>
      <Title title={'Pacientes'} subTitle={'Lista de pacientes cadastrados'} />
      <RegisterPatients />
      <Container>
        <PatientsTable />
      </Container>
    </div>
  )
}
