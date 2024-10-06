/** @format */

import {
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import { filterAndSortGraphData } from "@/services/helpers";
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
  const filteredData = filterAndSortGraphData(data);
  const { width } = WindowDimensions();
  const chartWidth = width > 500 ? width - 400 : width - 25;

  return (
    <div>
      <BarChart width={chartWidth} height={257} data={filteredData}>
        <XAxis dataKey={xaxis} stroke='#8884d8' />
        <YAxis dataKey={yaxis} />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Legend
          width={100}
          wrapperStyle={{
            top: 40,
            right: 20,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <Bar dataKey='uv' fill='#8884d8' barSize={30} />
      </BarChart>
    </div>
  );
};

export default Chart;
