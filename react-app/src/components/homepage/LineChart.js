import {
  Chart, ChartTitle, ChartSeries, ChartSeriesItem,
  ChartCategoryAxis, ChartCategoryAxisItem,
  ChartValueAxis, ChartValueAxisItem, ChartArea
} from "@progress/kendo-react-charts";
import "hammerjs";


export default function ChartContainer({ data }) {

  if (!data) return (<div></div>)
  const { title, labelsX, labelsY, dataPoints } = data
  const [minY, maxY] = labelsY
  return (
    <Chart style={{ opacity: data ? 1 : 0 }}>
      <ChartArea background='white' />
      <ChartTitle text={data?.title} color='black' />
      <ChartValueAxis>
        <ChartValueAxisItem
          title={{
            text: "Dollars",
          }}
          min={minY}
          max={maxY}
          color='black'
        />
      </ChartValueAxis>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          color="black"
          title={{
            text: "Months",
          }}
          categories={labelsX}

        />
      </ChartCategoryAxis>
      <ChartSeries>
        <ChartSeriesItem
          type="line"
          style='smooth'
          width={2}
          color='var(--money-green)'
          data={dataPoints}
          markers={{ visible: false }}
        />
      </ChartSeries>
    </Chart>
  );
}
