import { useEffect, useState } from 'react';
import { createHoldingsData, customizeChartTooltip } from '../utilities.js';
import PieChart, { Legend, Series, Tooltip, Format, Label, Size } from 'devextreme-react/pie-chart';


export default function PortfolioDoughnut({ portfolio, allHoldings = null, small = true }) {
  const [chartHoldings, setChartHoldings] = useState([]);

  useEffect(() => {
    if (allHoldings === null) setChartHoldings(createHoldingsData(portfolio));
    else setChartHoldings(allHoldings)
  }, [portfolio, allHoldings])


  return (
    <PieChart
      id="pie-chart"
      type="doughnut"
      palette="Soft Pastel"
      dataSource={chartHoldings}
    >
      <Series argumentField="stock" valueField='value'>
        <Label visible={allHoldings !== null} format="thousands" />
      </Series>
      <Legend
        horizontalAlignment="right"
        verticalAlignment="middle"
      />
      <Tooltip enabled={true} customizeTooltip={customizeChartTooltip}>
        <Format type="thousands" />
      </Tooltip>
    </PieChart>
  );
}
