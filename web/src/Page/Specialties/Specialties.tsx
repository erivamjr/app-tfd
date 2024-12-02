import { CompoSpecialties } from '../../Components/ComppoSpecialties/CompoSpecialties'
import Container from '../../Components/Ux/Container/Container'
import Title from '../../Components/Ux/Title/Title'

export function Specialties() {
  return (
    <Container>
      <Title
        title={'Especialidades'}
        subTitle={'Gerenciamento de especialidades'}
      />
      <CompoSpecialties />
    </Container>
  )
}
