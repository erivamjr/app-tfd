import RequestTable from '../../Components/CompoRequest/Table/RequestTable'
import Container from '../../Components/Ux/Container/Container'
import Title from '../../Components/Ux/Title/Title'
export default function Request() {
  return (
    <Container>
      <Title
        title={'Solicitações'}
        subTitle={'Gerenciamento de solicitações'}
      />

      <RequestTable />
    </Container>
  )
}
