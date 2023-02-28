import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const ColumnChart = (props) => {

  const [chart, setChart] = useState(
    {
      chartData: props.chartData,
      chartOptions: props.chartOptions,
    }
  );

  useEffect(() => {
    setChart(
      {
        chartData: props.chartData,
        chartOptions: props.chartOptions,
      }
    );
  }, [props.chartData, props.chartOptions]);

  return (
    <Chart
      options={chart.chartOptions}
      series={chart.chartData}
      type='bar'
      width='100%'
      height='100%'
    />
  );
}

export default ColumnChart;