import { StyledDiv } from '../styledComponents/misc';
import PieChart, {
  Legend,
  Series,
  Tooltip,
  Format,
  Label,
  HoverStyle,
  Size,
} from 'devextreme-react/pie-chart';

const portfolio = [
  { stock: 'AAPL', value: 300 },
  { stock: 'AMZN', value: 2000 },
  { stock: 'GOOG', value: 1500 },
  { stock: 'MSFT', value: 200 },
  { stock: 'CASH', value: 7000 },
];


export default function PortfolioDoughnut() {

  return (
    <PieChart
      id="pie"
      type="doughnut"
      palette="Soft Pastel"
      dataSource={portfolio}
    >
      <Series argumentField="stock" valueField='value'>
        <Label visible={true} format="thousands" />
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
  return {
    text: `${arg.valueText} - ${(arg.percent * 100).toFixed(2)}%`,
  };
}

