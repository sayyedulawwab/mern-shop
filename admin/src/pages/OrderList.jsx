import Delete from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { deleteOrder, getOrders } from '../redux/apiCalls';

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const StyledOrderList = styled.div`
  height: 70vh;
  width: 100%;
`;

const EditButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  margin-right: 20px;
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
const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);
  const handleDelete = id => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'userId', headerName: 'Customer', width: 200 },
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
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: params => {
        return (
          <>
            <Link to={'/orders/' + params.row._id}>
              <EditButton>Edit</EditButton>
            </Link>
            <Delete
              style={{ color: '#e64444', cursor: 'pointer' }}
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
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
      </Wrapper>
    </Container>
  );
};

export default OrderList;
