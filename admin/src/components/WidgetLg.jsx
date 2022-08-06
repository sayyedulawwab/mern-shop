import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import { userRequest } from '../requestMethods';

const StyledWidgetLg = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
`;
const Table = styled.table`
  width: 100%;
  border-spacing: 20px;
`;
const Tr = styled.tr``;
const Th = styled.th`
  text-align: left;
`;
const UserTd = styled.td`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
const Name = styled.span``;
const DateTd = styled.td`
  font-weight: 300;
`;
const AmountTd = styled.td`
  font-weight: 300;
`;
const StatusTd = styled.td``;
const Button = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  ${({ status }) =>
    status === 'approved' &&
    `
    background-color: #e5faf2;
    color: #3bb077;
  `}
  ${({ status }) =>
    status === 'declined' &&
    `
    background-color: #fff0f1;
    color: #d95087;
  `}
  ${({ status }) =>
    status === 'pending' &&
    `
    background-color: #ebf1fe;
    color: #2a7ade;
  `}
`;

const WidgetLg = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get('orders');
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  return (
    <StyledWidgetLg>
      <Title>Latest transactions</Title>
      <Table>
        <thead>
          <Tr>
            <Th>Customer</Th>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
          </Tr>
        </thead>
        <tbody>
          {orders?.map(order => (
            <Tr key={order._id}>
              <UserTd>
                <Name>{order.userId}</Name>
              </UserTd>
              <DateTd>
                <TimeAgo date={order.createdAt} />
              </DateTd>
              <AmountTd>${order.amount}</AmountTd>
              <StatusTd>
                <Button status={order.status}>{order.status}</Button>
              </StatusTd>
            </Tr>
          ))}
        </tbody>
      </Table>
    </StyledWidgetLg>
  );
};

export default WidgetLg;
