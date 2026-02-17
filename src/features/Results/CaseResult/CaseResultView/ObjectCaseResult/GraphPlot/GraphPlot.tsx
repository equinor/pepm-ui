import { PercentilesDto } from '../../../../../../api/generated';
import { ReactECharts, ReactEChartsProps } from '../Echarts/ReactECharts';

export interface ExtendedPrecetile extends PercentilesDto {
  min: number;
  max: number;
}
export const GraphPlot = ({
  data,
  mode,
}: {
  data: ExtendedPrecetile | undefined;
  mode: string;
}) => {
  if (data === undefined) return <>Loading ... </>;

  const option: ReactEChartsProps['option'] = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '10%',
      bottom: '20%',
    },
    xAxis: {
      type: 'value',
      name: mode + ' (m)',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'category',
      data: Object.keys(data),
      name: 'Precentile',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: [
      {
        type: 'line',
        data: Object.values(data),
      },
    ],
  };

  return (
    <div style={{ minWidth: '500px', width: '100%', overflowX: 'auto' }}>
      <ReactECharts
        option={option}
        style={{ minWidth: '500px', width: '100%', height: '350px' }}
      />
    </div>
  );
};
