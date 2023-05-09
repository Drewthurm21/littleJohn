import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { StyledDiv } from '../styledComponents/misc';
import { fetchHistoricalData } from "../../api/alphaVantage";
import FlipNumbers from 'react-flip-numbers';
import { usdFormatter } from '../../utilities';

export default function LineChartContainer(props) {
  const { ticker } = useParams()

  const alphaVantageKey = useSelector(state => state.session.apiKeys.alpha_vantage)
  const finnhubKey = useSelector(state => state.session.apiKeys.finnhub)
  const [historicalPriceData, setHistoricalPriceData] = useState([])
  const [currentPrice, setCurrentPrice] = useState(0)

  //fetch historical price data for initial chart data
  useEffect(() => {
    const getHistoricalPriceData = async () => {
      const historicalData = await fetchHistoricalData(ticker, alphaVantageKey)
      //manipulate data for lightwieght chart
      const timestamps = Object.keys(historicalData)
      const data = Object.values(historicalData).map((val, idx) => (
        //return unix timestamp and close price
        { time: new Date(timestamps[idx]).getTime(), value: Number(val["4. close"]) }

        //only keep last ~12 hours of 1min interval data
        //data comes newest -> oldest so reverse it
      )).splice(0, 720).reverse()

      //set current price and historical price data
      setCurrentPrice(data[data.length - 1].value)
      setHistoricalPriceData(data)
    }

    getHistoricalPriceData()
  }, [ticker, alphaVantageKey])


  //connect websocket to finnhub for live price updates
  useEffect(() => {
    const ws = new WebSocket(`wss://ws.finnhub.io?token=${finnhubKey}`)
    ws.onopen = () => {
      ws.send(JSON.stringify({ 'type': 'subscribe', 'symbol': ticker }))
    }

    //check time of last msg to prevent spamming finnhub
    let lastMsgTime = 0
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)

      //update if type is trade and time since last msg is > 1s
      if (msg.type === "trade" && msg.data[0].s === ticker && Date.now() - lastMsgTime > 1000) {
        let t = Date.now()
        lastMsgTime = t
        setHistoricalPriceData(prev => [...prev, { time: t, value: msg.data[0].p }])
        setCurrentPrice(msg.data[0].p)
      }
    }

    //unsubscribe from ticker on unmount
    return () => ws.close()
  }, [ticker, finnhubKey])


  return (
    <StyledDiv w='100%'>
      <StyledDiv col position='absolute' top='10vh' z='100'>
        <StyledDiv txLarge>{props.companyName || ticker}</StyledDiv>
        <FlipNumbers height={25} width={20} color='#000'
          play numbers={`${usdFormatter.format(currentPrice)}`} />
      </StyledDiv>
      <ChartComponent chartData={historicalPriceData} {...props}></ChartComponent>
    </StyledDiv>
  );
}

const ChartComponent = ({ ticker, chartData, company }) => {
  const chartContainerRef = useRef();

  //resize chart on window resize
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    //create and setup chart
    const chart = createChart(chartContainerRef.current, {
      priceScale: {
        position: 'right',
        autoScale: true,
        invertScale: false,
        alignLabels: true,
      },
      timeScale: { visible: false },
      crosshair: {
        vertLine: {
          color: 'black',
          width: 0.5,
          style: 1,
          visible: true,
        },
        horzLine: { visible: false },
        mode: 1,
      },
      grid: {
        horzLines: { color: '#fff' },
        vertLines: { color: '#fff' },
      },
    });

    // Create the main series & set data
    const priceLineSeries = chart.addAreaSeries({ lineColor: '#00c805', lineWidth: 1 });
    priceLineSeries.setData(chartData);


    // Create and style the tooltip
    const toolTip = document.createElement('div');
    toolTip.className = 'floating-tooltip';
    chartContainerRef.current.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove(param => {
      // hide tooltip if pointer is not on chart
      if (param.point === undefined || !param.time || param.point.x < 0 ||
        param.point.x > chartContainerRef.clientWidth ||
        param.point.y < 0 || param.point.y > chartContainerRef.clientHeight
      ) { toolTip.style.display = 'none'; }

      else {
        toolTip.style.display = 'block';

        //time comes in as ephoch time, convert to human readable
        const dateStr = new Date(param.time).toLocaleString();

        //get price data for current point and setup tooltip
        const data = param.seriesData.get(priceLineSeries);
        const price = data.value !== undefined ? data.value : data.close;
        toolTip.innerHTML = `
            <div style="color: ${'var(--money-green)'}">${company}</div>
            <div style="font-size: 24px; margin: 4px 0px;">${Math.round(100 * price) / 100}</div>
            <div>${dateStr}</div>
            `;

        // recalculate and set tooltip position
        const y = param.point.y;
        let x = param.point.x;
        toolTip.style.left = x + 75 + 'px';
        toolTip.style.top = y + 125 + 'px';
      }
    });


    window.addEventListener('resize', handleResize);

    return () => {
      //remove event listener and chart on unmount
      window.removeEventListener('resize', handleResize);
      chart.remove();

      //remove old tooltip elements to prevent artifacting
      const toolTipElements = document.body.getElementsByClassName('floating-tooltip')
      for (const element of toolTipElements) element.remove()
    };
  }, [chartData, ticker, chartContainerRef]);

  return (
    <StyledDiv w='100%' h='100%' ref={chartContainerRef} />
  );
};

