import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const UserList = () => {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <h1>UserList</h1>
      </Wrapper>
    </Container>
  );
};

export default UserList;
