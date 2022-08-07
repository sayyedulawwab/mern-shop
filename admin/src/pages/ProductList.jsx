import Delete from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { deleteProduct, getProducts } from '../redux/apiCalls';

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const StyledProductList = styled.div`
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

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  const handleDelete = id => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'product',
      headerName: 'Product',
      width: 200,
      renderCell: params => {
        return (
          <ListItem>
            <Image src={params.row.img} alt="" />
            {params.row.title}
          </ListItem>
        );
      },
    },
    { field: 'inStock', headerName: 'Stock', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: params => {
        return (
          <>
            <Link to={'/product/' + params.row._id}>
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
        <StyledProductList>
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            getRowId={row => row._id}
            pageSize={8}
            checkboxSelection
          />
        </StyledProductList>
      </Wrapper>
    </Container>
  );
};

export default ProductList;
