import Delete from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { deleteUser, getUsers } from '../redux/apiCalls';
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const StyledUserList = styled.div`
  height: 70vh;
  width: 100%;
`;
const ListItem = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
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
const AddButton = styled.button`
  margin: 1rem;
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  background-color: #6d44ff;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  :hover {
    background-color: #6d55ff;
  }
`;

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);
  const handleDelete = id => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'username',
      headerName: 'Usermame',
      width: 200,
      renderCell: params => {
        return (
          <ListItem>
            <Image
              src={
                params.row.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
            />
            {params.row.username}
          </ListItem>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'isAdmin', headerName: 'Admin', width: 200 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: params => {
        return (
          <>
            <Link to={'/users/' + params.row._id}>
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
        <StyledUserList>
          {' '}
          <Link to={'/newuser'}>
            <AddButton>Add new admin</AddButton>
          </Link>
          <DataGrid
            rows={users}
            disableSelectionOnClick
            columns={columns}
            getRowId={row => row._id}
            pageSize={8}
            checkboxSelection
          />
        </StyledUserList>
      </Wrapper>
    </Container>
  );
};

export default UserList;
