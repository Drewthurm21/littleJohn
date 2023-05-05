import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { createChart } from 'lightweight-charts';
import { StyledDiv } from '../styledComponents/misc';
import { fetchHistoricalData } from "../../api/alphaVantage";

export default function LineChartContainer(props) {
  const { ticker } = useParams()

  const alphaVantageKey = useSelector(state => state.session.apiKeys.alpha_vantage)
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

      setHistoricalPriceData(data)
    }

    getHistoricalPriceData()
  }, [ticker, alphaVantageKey])

  return (
    <StyledDiv w='100%'>
      <StyledDiv col position='absolute' top='10vh' z='100' txXLarge>
        <StyledDiv>{props.company}</StyledDiv>
        <StyledDiv>${currentPrice}</StyledDiv>

      </StyledDiv>
      <ChartComponent chartData={historicalPriceData} {...props}></ChartComponent>
    </StyledDiv>
  );
}

const ChartComponent = ({ ticker, chartData, company }) => {
  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

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

      const timeScale = chart.timeScale();
      timeScale.fitContent();
      timeScale.timeVisible = true;
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
          toolTip.style.left = x + 65 + 'px';
          toolTip.style.top = y + 125 + 'px';
        }
      });

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    },
    [chartData, ticker, chartContainerRef]
  );

  return (
    <StyledDiv w='100%' h='100%' ref={chartContainerRef} />
  );
};

