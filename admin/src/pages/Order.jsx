import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { updateOrder } from '../redux/apiCalls';

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;

const StyledUser = styled.div`
  flex: 4;
  padding: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Top = styled.div`
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
  width: 300px;
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
  flex-direction: column;
  width: 250px;
  label {
    margin-bottom: 10px;
    color: gray;
    margin-bottom: 10px;
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

const UpdateButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #6439ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Order = () => {
  const location = useLocation();
  const orderId = location.pathname.split('/')[2];

  const order = useSelector(state =>
    state.order.orders.find(order => order._id === orderId)
  );

  const [inputs, setInputs] = useState({
    userId: order.userId,
    products: order.products,
    amount: order.amount,
    address: order.address,
    status: order.status,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = e => {
    e.preventDefault();
    const updatedOrder = {
      ...inputs,
    };
    updateOrder(orderId, updatedOrder, dispatch);
    navigate('/orders');
  };

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <StyledUser>
          <TitleContainer>
            <h1>Order</h1>
          </TitleContainer>
          <Top>
            <InfoTop>
              <InfoTitle>User ID: {order.userId}</InfoTitle>
            </InfoTop>
            <InfoBottom>
              <InfoItem>
                <InfoKey>id:</InfoKey>
                <InfoValue>{order._id}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>Address:</InfoKey>
                <InfoValue>{order.address}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>Amount:</InfoKey>
                <InfoValue>$ {order.amount}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>Status:</InfoKey>
                <InfoValue>{order.status}</InfoValue>
              </InfoItem>
            </InfoBottom>
          </Top>
          <Bottom>
            <Form>
              <label>Address</label>
              <input
                type="text"
                placeholder={order.address}
                name="address"
                onChange={handleChange}
              />
              <label>Status</label>
              <select name="status" onChange={handleChange}>
                <option value="" disabled selected>
                  Choose
                </option>
                <option value="pending">pending</option>
                <option value="approved">approved</option>
                <option value="declined">declined</option>
              </select>

              <UpdateButton onClick={handleClick}>Update</UpdateButton>
            </Form>
          </Bottom>
        </StyledUser>
      </Wrapper>
    </Container>
  );
};

export default Order;
