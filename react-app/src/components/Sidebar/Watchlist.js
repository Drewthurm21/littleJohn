import { StyledDiv, StyledSpan } from '../styledComponents/misc';
import Sparkline, { Tooltip } from 'devextreme-react/sparkline';

export default function Watchlist({ name, items }) {

  return (
    <StyledDiv direction='column'>
      <StyledDiv align='center' w='100%'>
        <StyledDiv>{name}
          {items.map((ticker, i) => (
            <WatchlistItem key={i + ticker} ticker={ticker} />
          ))}
        </StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
}

function WatchlistItem({ ticker }) {

  return (
    <StyledDiv
      h='100%' w='100%'
      justify='space-between' align='center'
    >
      <StyledDiv>{ticker}</StyledDiv>
      <Sparkline
        dataSource={[1, 3, 5, 4, 6, 7, 5, 3, 5]}
        lineWidth={1}
        showMinMax={true}
        showFirstLast={false}
        className="sparkline"
        argumentField="month"
        valueField={'2023'}
        type="spline"
        lineColor="var(--money-green)"
        minColor="#6babac"
        maxColor="#ebdd8f"
      >
        <Tooltip format="currency" />
      </Sparkline>
      <StyledDiv direction='column'>
        <StyledSpan txSmall w='15px' h='15px'>stock</StyledSpan>
        <StyledSpan txSmall w='15px' h='15px'>stock</StyledSpan>
      </StyledDiv>
    </StyledDiv>
  )
}