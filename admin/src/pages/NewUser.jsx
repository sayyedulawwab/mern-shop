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
import { addUser } from '../redux/apiCalls';
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
const UserField = styled.div`
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
const NewUser = () => {
  const [inputs, setInputs] = useState({
    isAdmin: true,
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = e => {
    e.preventDefault();
    if (!file) {
      const user = { ...inputs };
      addUser(user, dispatch);
      navigate('/users');
    } else {
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
            const user = { ...inputs, img: downloadURL };
            addUser(user, dispatch);
            navigate('/users');
          });
        }
      );
    }
  };

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <StyledNewProduct>
          <h2>New Admin</h2>
          <Form>
            <UserField>
              <label>Image</label>
              <input
                type="file"
                id="file"
                onChange={e => setFile(e.target.files[0])}
              />
            </UserField>
            <UserField>
              <label>Username</label>
              <input
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={handleChange}
              />
            </UserField>
            <UserField>
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="john@gmail.com"
                onChange={handleChange}
              />
            </UserField>
            <UserField>
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
              />
            </UserField>
            <UserField>
              <label>Admin</label>
              <select name="isAdmin">
                <option value="true">Yes</option>
              </select>
            </UserField>
            <Button onClick={handleClick}>Create</Button>
          </Form>
        </StyledNewProduct>
      </Wrapper>
    </Container>
  );
};

export default NewUser;
