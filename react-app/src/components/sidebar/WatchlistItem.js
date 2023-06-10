import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { deleteWatchlistItemThunk } from '../../store/watchlists';
import { getSparklineInfoThunk } from '../../store/stocks';
import { StyledDiv } from '../styledComponents/misc';
import Sparkline, { Tooltip, Size } from 'devextreme-react/sparkline';

const sparkSettings = {
  lineWidth: 1,
  showMinMax: true,
  showFirstLast: false,
  className: "sparkline",
  type: "splinearea",
  minColor: "",
  maxColor: "",
}

export default function WatchlistItem({ listId, ticker, editList }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const data = useSelector(state => state.stocks.sparklineInfo)
  const apiKey = useSelector(state => state.session.apiKeys.alpha_vantage)
  const [showEditMenu, setShowEditMenu] = useState(editList)

  useEffect(() => {
    if (data && data[ticker]) return
    dispatch(getSparklineInfoThunk(ticker, apiKey))
  }, [dispatch, ticker, apiKey, data])

  useEffect(() => {
    if (editList) setShowEditMenu(true)
    else setShowEditMenu(false)
  }, [editList])

  const deleteItem = (listId, ticker) => {
    dispatch(deleteWatchlistItemThunk(listId, ticker))
  };

  const goToStockPage = () => {
    history.push(`/stocks/${ticker}`)
  };

  return data && (
    <StyledDiv w='100%' margin='0 0 8px 0'
      onClick={goToStockPage} spaceBetween bottomBorder>
      <StyledDiv w='23%' cursor='pointer' bold
      >{ticker}</StyledDiv>

      <Sparkline
        dataSource={data[ticker]?.tickerData}
        lineColor={data[ticker]?.movement > 0 ? 'var(--money-green)' : 'var(--red-500)'}
        {...sparkSettings}
      >
        <Size width={125} height={30} />
        <Tooltip format="currency" />
      </Sparkline>

      {showEditMenu &&
        <StyledDiv w='40' center bold
          txColor='var(--red-500)'
          onClick={() => deleteItem(listId, ticker)}
        >X</StyledDiv>}


      {!showEditMenu &&
        <StyledDiv w='40' spaceBetween col align='center'>
          <StyledDiv txSmall>${Number(data[ticker]?.currentPrice).toFixed(2)}</StyledDiv>
          <StyledDiv txSmall txColor={data[ticker]?.movement > 0 ? 'var(--money-green)' : 'var(--red-500)'}>
            {data[ticker]?.movement?.toFixed(2)}%
          </StyledDiv>
        </StyledDiv>}
    </StyledDiv >
  )
};

