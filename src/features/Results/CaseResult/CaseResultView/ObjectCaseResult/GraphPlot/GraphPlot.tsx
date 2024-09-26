/* eslint-disable max-lines-per-function */
import { GetObjectResultsDto } from '../../../../../../api/generated';
import { ReactECharts, ReactEChartsProps } from '../Echarts/ReactECharts';

export const GraphPlot = ({ data }: { data: GetObjectResultsDto }) => {
  const option: ReactEChartsProps['option'] = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Percentile', 'Value'],
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '20%',
      bottom: '20%',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: Object.keys(data.height.percentiles),
    },
    series: [
      {
        name: 'Channel width (m)',
        type: 'line',
        data: Object.values(data.height.percentiles),
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={option}
        style={{ width: '100%', height: '350px' }}
      />
    </div>
  );
};
