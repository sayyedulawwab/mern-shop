import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AttachMoney from '@mui/icons-material/AttachMoney';
import BarChart from '@mui/icons-material/BarChart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LineStyle from '@mui/icons-material/LineStyle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import StoreIcon from '@mui/icons-material/Store';
import Timeline from '@mui/icons-material/Timeline';
import TrendingUp from '@mui/icons-material/TrendingUp';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Side = styled.div`
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;
  background-color: white;
`;
const Top = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #6439ff;
`;

const Hr = styled.hr`
  height: 0;
  border: 0.5px solid rgb(230, 227, 227);
`;
const Center = styled.div`
  padding-left: 10px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ece8ff;
  }
`;
const Title = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: #999;
  margin-top: 15px;
  margin-bottom: 5px;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const Sidebar = () => {
  return (
    <Side>
      <Top>
        <Logo>admin</Logo>
      </Top>
      <Hr />
      <Center>
        <List>
          <Title>MAIN</Title>
          <ListItem>
            <Link to="/">
              <LineStyle className="icon" />
              <span>Home</span>
            </Link>
          </ListItem>
          <ListItem>
            <Timeline className="icon" />
            <span>Analytics</span>
          </ListItem>
          <ListItem>
            <TrendingUp className="icon" />
            <span>Sales</span>
          </ListItem>
          <Title>LISTS</Title>

          <ListItem>
            <Link to="/users">
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </Link>
          </ListItem>

          <ListItem>
            <Link to="/products">
              <StoreIcon className="icon" />
              <span>Products</span>
            </Link>
          </ListItem>

          <ListItem>
            <AttachMoney className="icon" />
            <span>Transactions</span>
          </ListItem>
          <ListItem>
            <BarChart className="icon" />
            <span>Reports</span>
          </ListItem>
          <Title>USEFUL</Title>
          <ListItem>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </ListItem>
          <ListItem>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </ListItem>
          <Title>SERVICE</Title>
          <ListItem>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </ListItem>
          <ListItem>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </ListItem>
          <ListItem>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </ListItem>
          <Title>USER</Title>
          <ListItem>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </ListItem>
          <ListItem>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </ListItem>
        </List>
      </Center>
      <Bottom></Bottom>
    </Side>
  );
};

export default Sidebar;
