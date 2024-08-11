import CreateRequest from '../../Components/CompoRequest/CreateRequest'
import RequestTable from '../../Components/CompoRequest/Table/RequestTable'
import Container from '../../Components/Ux/Container/Container'

export default function Request() {
  return (
    <Container>
      <CreateRequest />
      <RequestTable />
    </Container>
  )
}
