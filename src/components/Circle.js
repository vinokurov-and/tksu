import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class CircleGr extends PureComponent {
  render() {
    return (
      <div style={{ widht: "100%", height: "600px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={500}>
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Pie
              data={this.props.dataset.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
            >
              {this.props.dataset.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    this.props.dataset.legend.find(
                      (item) => item.name === entry.name
                    )?.color
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
