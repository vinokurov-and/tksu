import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class GrOne extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <div style={{ widht: "100%", height: "400px" }}>
        <ResponsiveContainer>
          <BarChart
            width={600}
            height={500}
            layout={this.props.layout}
            data={this.props.dataset.data}
            margin={{
              top: 40,
              right: 60,
              left: 60,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis {...this.props.dataset.xAxis} />
            <YAxis {...this.props.dataset.yAxis} />
            <Tooltip />
            <Legend />
            {(this.props.dataset.legend || []).map((item) => {
              return (
                <Bar
                  label={this.props.dataset.bar?.label || { position: "top" }}
                  name={item.title}
                  dataKey={item.name}
                  fill={item.color}
                />
              );
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
