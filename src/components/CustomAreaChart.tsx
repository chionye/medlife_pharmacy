/** @format */

import { WindowDimensions } from "@/hooks/windowDimensions";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomAreaChart = ({
  data,
  xaxis,
  yaxis,
  naxis,
}: {
  data: any;
  xaxis: any;
  yaxis: any;
  naxis: any;
}) => {
  const { width } = WindowDimensions();
  const chartWidth =
    width > 500 && width <= 1024
      ? width / 2 - 200
      : width > 1024
      ? width / 1.3
      : width - 25;

  return (
    <ResponsiveContainer width={chartWidth} height={400}>
      <AreaChart
        width={chartWidth}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={xaxis} />
        <YAxis />
        <Tooltip />
        <Area
          type='monotone'
          dataKey={yaxis}
          stackId='1'
          stroke='#8884d8'
          fill='#8884d8'
        />
        <Area
          type='monotone'
          dataKey={naxis}
          stackId='1'
          stroke='#82ca9d'
          fill='#82ca9d'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
