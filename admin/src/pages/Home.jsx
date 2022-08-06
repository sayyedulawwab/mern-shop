import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Chart from '../components/Chart';
import FeaturedInfo from '../components/FeaturedInfo';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import WidgetLg from '../components/WidgetLg';
import WidgetSm from '../components/WidgetSm';
import { userRequest } from '../requestMethods';
const Container = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  flex: 5;
`;
const HomeWidgets = styled.div`
  display: flex;
  margin: 20px;
`;

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/users/stats');
        res.data.map(item =>
          setUserStats(prev => [
            ...prev,
            { name: MONTHS[item._id - 1], 'Active User': item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Navbar />
        <FeaturedInfo />
        <Chart
          data={userStats}
          title="User Analytics"
          grid
          dataKey="Active User"
        />
        <HomeWidgets>
          <WidgetSm />
          <WidgetLg />
        </HomeWidgets>
      </Wrapper>
    </Container>
  );
};

export default Home;
