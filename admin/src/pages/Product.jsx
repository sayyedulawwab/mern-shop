import Publish from '@mui/icons-material/Publish';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Chart from '../components/Chart';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { userRequest } from '../requestMethods';

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;

const StyledProduct = styled.div`
  flex: 4;
  padding: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddButton = styled.h1`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;

const Top = styled.div`
  display: flex;
`;

const TopLeft = styled.div`
  flex: 1;
`;

const TopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const InfoTop = styled.div`
  display: flex;
  align-items: center;
`;

const InfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const InfoBottom = styled.div`
  margin-top: 10px;
`;

const InfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

const InfoKey = styled.span``;

const InfoValue = styled.span`
  font-weight: 300;
`;

const Bottom = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const FormLeft = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
    color: gray;
  }

  input {
    margin-bottom: 10px;
    border: none;
    padding: 5px;
    border-bottom: 1px solid gray;
  }

  select {
    margin-bottom: 10px;
  }
`;
const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
`;

const UploadImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const UpdateButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #6439ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const [pStats, setPStats] = useState([]);
  const product = useSelector(state =>
    state.product.products.find(product => product._id === productId)
  );
  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('orders/income?pid=' + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map(item =>
          setPStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <StyledProduct>
          <TitleContainer>
            <h1>Product</h1>
            <Link to="/newproduct">
              <AddButton>Create</AddButton>
            </Link>
          </TitleContainer>
          <Top>
            <TopLeft>
              <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
            </TopLeft>
            <TopRight>
              <InfoTop>
                <InfoImg src={product.img} alt="" />
                <InfoTitle>{product.title}</InfoTitle>
              </InfoTop>
              <InfoBottom>
                <InfoItem>
                  <InfoKey>id:</InfoKey>
                  <InfoValue>{product._id}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoKey>sales:</InfoKey>
                  <InfoValue>5123</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoKey>in stock:</InfoKey>
                  <InfoValue>{product.inStock}</InfoValue>
                </InfoItem>
              </InfoBottom>
            </TopRight>
          </Top>
          <Bottom>
            <Form>
              <FormLeft>
                <label>Product Name</label>
                <input type="text" placeholder={product.title} />
                <label>Product Description</label>
                <input type="text" placeholder={product.desc} />
                <label>Price</label>
                <input type="text" placeholder={product.price} />
                <label>In Stock</label>
                <select name="inStock" id="idStock">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormLeft>
              <FormRight>
                <Upload>
                  <UploadImage src={product.img} alt="" />
                  <label for="file">
                    <Publish />
                  </label>
                  <input type="file" id="file" style={{ display: 'none' }} />
                </Upload>
                <UpdateButton>Update</UpdateButton>
              </FormRight>
            </Form>
          </Bottom>
        </StyledProduct>
      </Wrapper>
    </Container>
  );
};

export default Product;
