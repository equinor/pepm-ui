/* eslint-disable max-lines-per-function */
import {
  GetObjectResultsDto,
  PercentilesDto,
} from '../../../../../../api/generated';
import { ReactECharts, ReactEChartsProps } from '../Echarts/ReactECharts';

interface ExtendedPrecetile extends PercentilesDto {
  min: number;
  max: number;
}
export const GraphPlot = ({ data }: { data: GetObjectResultsDto }) => {
  const PrecentilesMinMax: ExtendedPrecetile = {
    min: data.height.min,
    p10: data.height.percentiles.p10,
    p20: data.height.percentiles.p20,
    p30: data.height.percentiles.p30,
    p40: data.height.percentiles.p40,
    p50: data.height.percentiles.p50,
    p60: data.height.percentiles.p60,
    p70: data.height.percentiles.p70,
    p80: data.height.percentiles.p80,
    p90: data.height.percentiles.p90,
    max: data.height.max,
  };

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
      data: Object.keys(PrecentilesMinMax),
    },
    series: [
      {
        name: 'Channel width (m)',
        type: 'line',
        data: Object.values(PrecentilesMinMax),
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
