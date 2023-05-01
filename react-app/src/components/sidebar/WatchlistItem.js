import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSparklineInfo } from '../../store/stocks';
import Sparkline, { Tooltip, Size } from 'devextreme-react/sparkline';
import { StyledDiv, StyledSpan } from '../styledComponents/misc';

const sparkSettings = {
  lineWidth: 1,
  showMinMax: true,
  showFirstLast: false,
  className: "sparkline",
  type: "splinearea",
  minColor: "",
  maxColor: "",
}

export default function WatchlistItem({ ticker }) {
  const dispatch = useDispatch()
  const data = useSelector(state => state.stocks.sparklineInfo)
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)

  useEffect(() => {
    if (data && data[ticker]) return

    console.log('getting data for', ticker)
    dispatch(getSparklineInfo(ticker, apiKey))
  }, [])


  return data && (
    <StyledDiv w='100%' margin='0 0 8px 0'
      spaceBetween customBorder='border-bottom: 1px solid var(--gray-400);'
    >
      <StyledDiv w='50px'>{ticker}</StyledDiv>

      <Sparkline
        dataSource={data[ticker]?.tickerData}
        lineColor={data[ticker]?.movement > 0 ? 'var(--money-green)' : 'var(--red-500)'}
        {...sparkSettings}
      >
        <Size width={120} height={30} />
        <Tooltip format="currency" />
      </Sparkline>

      <StyledDiv w='40' spaceBetween direction='column' align='center'>
        <StyledDiv txSmall>${Number(data[ticker]?.currentPrice).toFixed(2)}</StyledDiv>
        <StyledDiv txSmall
          txColor={data[ticker]?.movement > 0 ? 'var(--money-green)' : 'var(--red-500)'}>{data[ticker]?.movement?.toFixed(2)}%</StyledDiv>
      </StyledDiv>
    </StyledDiv>
  )
};

