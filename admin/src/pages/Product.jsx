import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const Product = () => {
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <h1>Product</h1>
      </Wrapper>
    </Container>
  );
};

export default Product;
