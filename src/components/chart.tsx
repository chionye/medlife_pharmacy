/** @format */

import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { WindowDimensions } from "@/hooks/windowDimensions";

const Chart = ({
  data,
  xaxis,
  yaxis,
}: {
  data: any;
  xaxis: string;
  yaxis: string;
}) => {
  const { width } = WindowDimensions();
  const chartWidth =
    width > 500 && width <= 1024
      ? width / 2 - 200
      : width > 1024
      ? width / 2 - 210
      : width - 25;

  return (
    <div>
      <LineChart
        width={chartWidth}
        height={257}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type='monotone' dataKey={yaxis} stroke='#8884d8' />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <XAxis dataKey={xaxis} />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Chart;
