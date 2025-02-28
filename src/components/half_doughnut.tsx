/** @format */

import { WindowDimensions } from "@/hooks/windowDimensions";
import { PieChart, Pie, Cell } from "recharts";

const HalfDoughnut = () => {
  const { width } = WindowDimensions();
  const chartWidth =
    width > 500 && width <= 1024
      ? width / 2 - 200
      : width > 1024
      ? width / 3
      : width - 25;
  const data = [
    { name: "A", value: 80, color: "#585BA8" },
    { name: "B", value: 45, color: "#333333" },
  ];
  const cx = chartWidth - 200;
  const cy = 200;
  const iR = 100;
  const oR = 150;

  return (
    <PieChart width={chartWidth} height={250}>
      <Pie
        dataKey='value'
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill='#8884d8'
        stroke='none'>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default HalfDoughnut;
