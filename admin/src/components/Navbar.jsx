import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Search from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.span`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const Navbar = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (currentUser !== null) {
      logout(dispatch);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input type="text" placeholder="Search..." />
            <Search style={{ color: 'gray', fontSize: '14px' }} />
          </SearchContainer>
        </Left>
        <Center></Center>
        <Right>
          <MenuItem>
            <LanguageOutlinedIcon /> English
          </MenuItem>
          {currentUser && <MenuItem onClick={handleClick}>LOGOUT</MenuItem>}
          <MenuItem>
            <Badge badgeContent={2} color="primary">
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </MenuItem>

          <MenuItem>
            <Avatar
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
