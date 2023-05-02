import { useEffect, useState } from 'react';
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  Size,
} from 'devextreme-react/pie-chart';


export default function PortfolioDoughnut({ portfolio, allHoldings = null }) {
  const [chartHoldings, setChartHoldings] = useState([]);

  useEffect(() => {
    if (allHoldings === null) setChartHoldings(createHoldings(portfolio));
    else setChartHoldings(allHoldings)
  }, [portfolio, allHoldings])


  return (
    <PieChart
      id="pie"
      type="doughnut"
      palette="Soft Pastel"
      dataSource={chartHoldings}
    >
      <Series argumentField="stock" valueField='value'>
        <Label visible={allHoldings !== null} format="thousands" />
      </Series>
      <Legend
        margin={0}
        horizontalAlignment="right"
        verticalAlignment="top"
      />
      <Size width={280} height={300} />
      <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
        <Format type="thousands" />
      </Tooltip>
    </PieChart>
  );
}

function customizeTooltip(arg) {
  console.log(arg)
  return {
    text: `${arg.argumentText}: ${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
  };
}

function createHoldings(portfolio) {
  const holdings = {
    USD: { stock: 'USD', quantity: portfolio.balance, value: portfolio.balance },
  };

  for (let trade of Object.values(portfolio.trades)) {
    const { ticker, quantity, price, trade_type } = trade;

    if (holdings[ticker]) {
      if (trade_type === 'buy') {
        holdings[ticker].quantity += quantity;
        holdings[ticker].value += quantity * price;
      } else {
        holdings[ticker].quantity -= quantity;
        holdings[ticker].value -= quantity * price;
      }
      continue;
    }

    holdings[ticker] = {
      stock: ticker,
      quantity: quantity,
      value: quantity * price,
    }
  }
  return Object.values(holdings);
}

