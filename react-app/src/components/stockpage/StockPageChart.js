import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { StyledDiv } from '../styledComponents/misc';

const ChartComponent = ({ ticker, priceHistory, company }) => {
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
      const newSeries = chart.addAreaSeries({ lineColor: '#00c805', lineWidth: 1 });
      newSeries.setData(priceHistory);

      // Create and style the tooltip
      const toolTip = document.createElement('div');
      toolTip.className = 'floating-tooltip';
      const toolTipWidth = 96;
      const toolTipHeight = 80;
      const toolTipMargin = 15;
      chartContainerRef.current.appendChild(toolTip);

      // update tooltip
      chart.subscribeCrosshairMove(param => {
        if (
          param.point === undefined ||
          !param.time ||
          param.point.x < 0 ||
          param.point.x > chartContainerRef.clientWidth ||
          param.point.y < 0 ||
          param.point.y > chartContainerRef.clientHeight
        ) {
          toolTip.style.display = 'none';
        } else {
          // time will be in the same format that we supplied to setData.
          // thus it will be YYYY-MM-DD
          const dateStr = new Date(param.time).toLocaleString();
          toolTip.style.display = 'block';
          const data = param.seriesData.get(newSeries);
          const price = data.value !== undefined ? data.value : data.close;
          toolTip.innerHTML = `
            <div style="color: ${'var(--money-green)'}">${company}</div>
            <div style="font-size: 24px; margin: 4px 0px;">${Math.round(100 * price) / 100}</div>
            <div>${dateStr}</div>
            `;

          const y = param.point.y;
          let left = param.point.x + toolTipMargin;
          if (left > chartContainerRef.clientWidth - toolTipWidth) {
            left = param.point.x - toolTipMargin - toolTipWidth;
          }

          let top = y + toolTipMargin;
          if (top > chartContainerRef.clientHeight - toolTipHeight) {
            top = y - toolTipHeight - toolTipMargin;
          }
          toolTip.style.left = left + 65 + 'px';
          toolTip.style.top = top + 125 + 'px';
        }
      });

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    },
    [priceHistory, ticker, chartContainerRef]
  );

  return (
    <StyledDiv w='100%' h='100%' ref={chartContainerRef} />
  );
};

export default function LineChartContainer(props) {

  return (
    <ChartComponent {...props}></ChartComponent>
  );
}