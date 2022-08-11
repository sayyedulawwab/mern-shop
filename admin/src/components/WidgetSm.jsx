import Visibility from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../requestMethods';

const StyledWidgetSm = styled.div`
  flex: 1;
  padding: 10px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 14px;
  color: rgb(160, 160, 160);
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const ListItem = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.h3`
  font-weight: 600;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px 10px;
  background-color: #eeeef7;
  color: #555;
  cursor: pointer;
  .icon {
    font-size: 18px;
    padding: 5px;
    border-radius: 5px;
    align-self: flex-end;
  }
`;

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('users/?new=true');
        setUsers(res.data);
      } catch {}
    };
    getUsers();
  }, []);

  return (
    <StyledWidgetSm>
      <Title>New Join Members</Title>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>
            <Image
              src={
                user.img ||
                'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
            />
            <User>
              <Username>{user.username}</Username>
            </User>
            <Button>
              <Visibility className="icon" />
              Display
            </Button>
          </ListItem>
        ))}
      </List>
    </StyledWidgetSm>
  );
}
