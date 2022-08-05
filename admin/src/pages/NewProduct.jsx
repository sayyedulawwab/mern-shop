import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const NewProduct = () => {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <h1>NewProduct</h1>
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
