import Publish from '@mui/icons-material/Publish';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import app from '../firebase';

import { updateUser } from '../redux/apiCalls';

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

const User = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const user = useSelector(state =>
    state.user.users.find(user => user._id === userId)
  );

  const [inputs, setInputs] = useState({
    isAdmin: user.isAdmin,
    img: user.img,
  });
  const [file, setFile] = useState(user.img);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = e => {
    e.preventDefault();
    if (file === user.img) {
      const updatedUser = {
        ...inputs,
        img: user.img,
      };
      updateUser(userId, updatedUser, dispatch);
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
            const updatedProduct = {
              ...inputs,
              img: downloadURL,
            };
            updateUser(userId, updatedProduct, dispatch);
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
        <StyledUser>
          <TitleContainer>
            <h1>User</h1>
          </TitleContainer>
          <Top>
            <InfoTop>
              <InfoImg
                src={
                  user.img ||
                  'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
                }
                alt=""
              />
              <InfoTitle>{user.username}</InfoTitle>
            </InfoTop>
            <InfoBottom>
              <InfoItem>
                <InfoKey>id:</InfoKey>
                <InfoValue>{user._id}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>Email:</InfoKey>
                <InfoValue>{user.email}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoKey>Admin:</InfoKey>
                <InfoValue>{user.isAdmin ? 'Yes' : 'No'}</InfoValue>
              </InfoItem>
            </InfoBottom>
          </Top>
          <Bottom>
            <Form>
              <FormLeft>
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  name="username"
                  onChange={handleChange}
                />
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder={user.email}
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
                  <UploadImage src={user.img} alt="" />
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
          </Bottom>
        </StyledUser>
      </Wrapper>
    </Container>
  );
};

export default User;
