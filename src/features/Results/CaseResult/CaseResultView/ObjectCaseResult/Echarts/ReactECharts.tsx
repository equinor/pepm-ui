/**
 * Component 'Borrowed' from https://dev.to/manufac/using-apache-echarts-with-react-and-typescript-353k
 * Echarts wrapper to make Echarts more usable with React lifecycle.
 *
 * This component only ensures that the chart is initialized with provided options, resizes the chart on container resize
 * and cleans up the chart when the component is removed from DOM. It also interacts with echarts
 * built in chart loading functionally such that this does not need to be done elsewhere.
 *
 * **Note: This base is configured such that the chart's width and height will be set to take the entire width and height
 * of its parent element. This behaviour can be overridden using the {@see style} prop.**
 */

import {
  ECharts,
  EChartsOption,
  getInstanceByDom,
  init,
  SetOptionOpts,
} from 'echarts';
import { CSSProperties, useEffect, useRef } from 'react';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

export function ReactECharts({
  option,
  style,
  settings,
  loading,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;

    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener('resize', resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '350px', ...style }} />
  );
}
