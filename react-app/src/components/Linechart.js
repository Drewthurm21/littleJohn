import {
  Chart,
  CommonSeriesSettings,
  CommonAxisSettings,
  Series,
  ArgumentAxis,
  Grid,
  Label,
  Format,
  ValueAxis,
  Legend,
  Point,
  Tick
} from 'devextreme-react/chart';

export default function LineChart({ ticker, priceHistory }) {

  return (
    <Chart id="line-chart" dataSource={priceHistory} title={`${ticker} Price History`}>
      <CommonSeriesSettings argumentField="date" valueField="price" type="line">
        <Point visible={false} />
      </CommonSeriesSettings>
      <Series color="var(--money-green)" />
      <ArgumentAxis allowDecimals={false} axisDivisionFactor={60}>
        <Tick visible={false} />
        <Grid visible={false} />
        <Label visible={true}>
          <Format type="decimal" precision={2} />
        </Label>
      </ArgumentAxis>
      <ValueAxis
        inverted={false}
        minValueMargin={.1}
        maxValueMargin={.1}>
        <Grid visible={false} />
        <Tick visible={false} />
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  );
}



