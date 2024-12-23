import PatientsTable from '../../Components/CompoPatients/PatientsTable'
import Container from '../../Components/Ux/Container/Container'
import Title from '../../Components/Ux/Title/Title'

export default function Patients() {
  return (
    <div>
      <Container>
        <Title
          title={'Pacientes'}
          subTitle={'Lista de pacientes cadastrados'}
        />

        <PatientsTable />
      </Container>
    </div>
  )
}
