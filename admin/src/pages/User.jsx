import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const User = () => {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <h1>User</h1>
      </Wrapper>
    </Container>
  );
};

export default User;
