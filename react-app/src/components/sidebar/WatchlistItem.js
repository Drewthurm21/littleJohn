import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSparklineInfo } from '../../store/stocks';
import Sparkline, { Tooltip, Size } from 'devextreme-react/sparkline';
import { StyledDiv, StyledSpan } from '../styledComponents/misc';


export default function WatchlistItem({ ticker }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.stocks.sparklineInfo)
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (data && data[ticker]) {
      console.log('already have data')
      console.log(data[ticker])
      return
    }
    console.log('getting data')
    dispatch(getSparklineInfo(ticker, apiKey))
    setLoaded(true)
  }, [])


  return data && (
    <StyledDiv
      h='100%' w='100%'
      margin='0 0 8px 0'
      justify='space-between'
      customBorder='border-bottom: 1px solid var(--gray-200);'
    >
      <StyledDiv>{ticker}</StyledDiv>

      <StyledDiv>
        {data && data[ticker] && data[ticker]?.error ? (
          <StyledDiv w='120px'>{data[ticker].error}</StyledDiv>
        ) : (
          <Sparkline
            dataSource={data[ticker]?.tickerData}
            lineWidth={1}
            showMinMax={true}
            showFirstLast={false}
            className="sparkline"
            argumentField="month"
            valueField={'2023'}
            type="splinearea"
            lineColor="var(--money-green)"
            minColor=""
            maxColor=""
          >
            <Size width={120} height={30} />
            <Tooltip format="currency" />
          </Sparkline>
        )}
      </StyledDiv>


      <StyledDiv direction='column' align='center'>
        <StyledSpan txSmall>${Number(data[ticker]?.currentPrice).toFixed(2)}</StyledSpan>
        <StyledSpan txColor={data[ticker]?.movement > 0 ? 'var(--money-green)' : 'var(--red-500)'} txSmall>{data[ticker]?.movement?.toFixed(2)}%</StyledSpan>
      </StyledDiv>

    </StyledDiv>
  )
};

