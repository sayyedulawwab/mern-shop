import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import Publish from '@mui/icons-material/Publish';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import app from '../firebase';
import { deleteUser, logout, updateUser } from '../redux/apiCalls';
import { mobile } from '../responsive';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  width: 80%;
  margin: 0 auto;

  ${mobile({ padding: '10px' })}
`;
const Info = styled.div`
  padding: 30px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Title = styled.h3``;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
`;
const InfoKey = styled.p`
  padding: 0 10px;
`;

const InfoValue = styled.p``;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  padding: 30px;
`;
const EditButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #3bb077;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 5px 15px;
`;
const DeleteButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #e64444;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 15px;
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

const User = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [editForm, setEditForm] = useState(false);

  const [inputs, setInputs] = useState({
    isAdmin: currentUser.isAdmin,
    img: currentUser.img,
  });
  const [file, setFile] = useState(currentUser.img);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteUser(currentUser._id, dispatch);
    logout(dispatch);
    navigate('/');
  };
  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = e => {
    e.preventDefault();
    if (file === currentUser.img) {
      const updatedUser = {
        ...inputs,
        img: currentUser.img,
      };
      updateUser(currentUser._id, updatedUser, dispatch);
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
            const updatedUser = {
              ...inputs,
              img: downloadURL,
            };
            updateUser(currentUser._id, updatedUser, dispatch);
            navigate('/');
          });
        }
      );
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <h1>Profile</h1>
        <Info>
          <InfoItem>
            <Img
              src={
                currentUser.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
            />
            <Title>{currentUser.username}</Title>
          </InfoItem>
          <InfoItem>
            <InfoKey>Email:</InfoKey>
            <InfoValue>{currentUser.email}</InfoValue>
          </InfoItem>
          <InfoItem>
            <EditButton onClick={() => setEditForm(!editForm)}>
              <span>Edit</span>
              <Edit style={{ fontSize: '1rem' }} />
            </EditButton>
            <DeleteButton onClick={() => handleDelete()}>
              <span>Delete</span>
              <Delete style={{ fontSize: '1rem' }} />
            </DeleteButton>
          </InfoItem>
        </Info>
        {editForm && (
          <Form>
            <FormLeft>
              <label>Username</label>
              <input
                type="text"
                placeholder={currentUser.username}
                name="username"
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder={currentUser.email}
                onChange={handleChange}
              />
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={handleChange}
              />
            </FormLeft>
            <FormRight>
              <Upload>
                <UploadImage src={currentUser.img} alt="" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={e => setFile(e.target.files[0])}
                />
              </Upload>
              <UpdateButton onClick={handleClick}>Update</UpdateButton>
            </FormRight>
          </Form>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default User;
