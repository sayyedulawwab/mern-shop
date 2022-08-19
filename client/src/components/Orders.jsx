import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getOrders } from '../redux/apiCalls';
const Info = styled.div`
  padding: 30px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;

const Title = styled.h3``;

const StyledOrderList = styled.div`
  height: 70vh;
  width: 100%;
`;
const Status = styled.button`
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
const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);
  const currentUser = useSelector(state => state.user.currentUser);
  useEffect(() => {
    console.log(currentUser);
    getOrders(currentUser._id, dispatch);
  }, [currentUser, dispatch]);

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'createdAt',
      headerName: 'Date',
      width: 200,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 200,
      renderCell: params => {
        return <p>$ {params.row.amount}</p>;
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      renderCell: params => {
        return (
          <>
            <Status status={params.row.status}>{params.row.status}</Status>
          </>
        );
      },
    },
  ];
  return (
    <Info>
      <Title>
        <h2>Orders</h2>
      </Title>
      <StyledOrderList>
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          getRowId={row => row._id}
          pageSize={8}
          checkboxSelection
        />
      </StyledOrderList>
    </Info>
  );
};

export default Orders;
