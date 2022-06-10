import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color:${props => props.theme.textColor};
  padding:  20px;
  border-radius: 15px;
  border: 1px solid white;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
    
  }
  &:hover {
    a{
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 48px;
  color:${props=> props.theme.accentColor};
;`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active:boolean,
  type: string,
}

interface ICoinsProps {
};

function Coins() {
  const { isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
  return(
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
      <CoinList>
        {data?.slice(0,100).map((coin)=>(<Coin key={coin.id}>
          <Link to={
            {
              pathname:`/${coin.id}`,
              state: {name: coin.name}, 
            }}>
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            />
            {coin.name}&rarr;</Link>
        </Coin>))}
      </CoinList>
      )}
    </Container>
  )
}
export default Coins;
