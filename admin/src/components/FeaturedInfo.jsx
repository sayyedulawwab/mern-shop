import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../requestMethods';

const Featured = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const FeaturedItem = styled.div`
  flex: 1;
  margin: 0px 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const Title = styled.h2`
  font-size: 16px;
  font-weight: 500;
`;
const MoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;
const Money = styled.span`
  font-size: 30px;
  font-weight: 600;
`;
const MoneyRate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;

  .icon {
    font-size: 14px;
    margin-left: 5px;
    color: green;
  }

  .icon.negative {
    color: red;
  }
`;
const Sub = styled.span`
  font-size: 15px;
  color: gray;
`;

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get('orders/income');
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <Featured>
      <FeaturedItem>
        <Title>Revenue</Title>
        <MoneyContainer>
          <Money>${income[1]?.total}</Money>
          <MoneyRate>
            %{Math.floor(perc)}{' '}
            {perc < 0 ? (
              <ArrowDownward className="icon negative" />
            ) : (
              <ArrowUpward className="icon" />
            )}
          </MoneyRate>
        </MoneyContainer>
        <Sub>Compared to last month</Sub>
      </FeaturedItem>
      <FeaturedItem>
        <Title>Sales</Title>
        <MoneyContainer>
          <Money>$4,415</Money>
          <MoneyRate>
            -1.4 <ArrowDownward className="icon negative" />
          </MoneyRate>
        </MoneyContainer>
        <Sub>Compared to last month</Sub>
      </FeaturedItem>
      <FeaturedItem>
        <Title>Cost</Title>
        <MoneyContainer>
          <Money>$2,225</Money>
          <MoneyRate>
            +2.4 <ArrowUpward className="icon" />
          </MoneyRate>
        </MoneyContainer>
        <Sub>Compared to last month</Sub>
      </FeaturedItem>
    </Featured>
  );
};

export default FeaturedInfo;
