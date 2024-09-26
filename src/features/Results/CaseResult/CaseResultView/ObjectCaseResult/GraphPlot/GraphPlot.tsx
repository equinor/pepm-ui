/* eslint-disable max-lines-per-function */
import { ReactECharts, ReactEChartsProps } from '../Echarts/ReactECharts';

export const GraphPlot = () => {
  const option: ReactEChartsProps['option'] = {
    dataset: {
      source: [
        ['Commodity', 'Owned', 'Financed'],
        ['Commodity 1', 4, 1],
        ['Commodity 2', 2, 4],
        ['Commodity 3', 3, 6],
        ['Commodity 4', 5, 3],
      ],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Owned', 'Financed'],
    },
    grid: {
      left: '10%',
      right: '0%',
      top: '20%',
      bottom: '20%',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
  };

  return (
    <>
      <ReactECharts option={option} />
    </>
  );
};
