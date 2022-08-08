import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import app from '../firebase';
import { addProduct } from '../redux/apiCalls';

const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;

const StyledNewProduct = styled.div`
  flex: 4;
  margin-left: 100px;
`;
const Form = styled.form`
  margin-top: 10px;
`;
const ProductItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    color: gray;
    font-weight: 600;
    margin-bottom: 10px;
  }
  input {
    padding: 10px;
  }
  select {
    padding: 10px;
  }
`;
const Button = styled.button`
  margin-top: 10px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background-color: #6439ff;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const NewProduct = () => {
  const [inputs, setInputs] = useState({
    inStock: true,
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = e => {
    setCat(e.target.value.split(','));
  };
  const handleClick = e => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      error => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
          navigate('/products');
        });
      }
    );
  };

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <StyledNewProduct>
          <h2>New Product</h2>
          <Form>
            <ProductItem>
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={e => setFile(e.target.files[0])}
              />
            </ProductItem>
            <ProductItem>
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder="Apple Airpods"
                onChange={handleChange}
              />
            </ProductItem>
            <ProductItem>
              <label>Description</label>
              <input
                name="desc"
                type="text"
                placeholder="description..."
                onChange={handleChange}
              />
            </ProductItem>
            <ProductItem>
              <label>Price</label>
              <input
                name="price"
                type="number"
                placeholder="100"
                onChange={handleChange}
              />
            </ProductItem>
            <ProductItem>
              <label>Categories</label>
              <input
                type="text"
                placeholder="jeans,skirts"
                onChange={handleCat}
              />
            </ProductItem>
            <ProductItem>
              <label>Stock</label>
              <select name="inStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </ProductItem>
            <Button onClick={handleClick}>Create</Button>
          </Form>
        </StyledNewProduct>
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
