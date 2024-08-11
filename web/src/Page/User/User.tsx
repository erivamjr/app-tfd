import UserTable from '../../Components/CompoUser/UserTable'
import Container from '../../Components/Ux/Container/Container'
import Title from '../../Components/Ux/Title/Title'

export default function User() {
  return (
    <Container>
      <Title title={'Usuários'} subTitle={'Gerenciamento de usuários'} />
      <UserTable />
    </Container>
  )
}
