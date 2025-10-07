"use client";

import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00'];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} fontSize={24} fontWeight="bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#333" fontSize={18}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

type ChartData = { name: string; value: number }[];

interface PortfolioPieChartProps {
  data: ChartData;
  activeIndex: number | null;
  onPieEnter: (_: any, index: number) => void;
  onMouseLeave: () => void;
}

export default function PortfolioPieChart({ data, activeIndex, onPieEnter, onMouseLeave }: PortfolioPieChartProps) {
  return (
    <div style={{ width: 300, height: 300 }}>
      <ResponsiveContainer>
        <PieChart onMouseLeave={onMouseLeave}>
          <Pie
            // @ts-ignore
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            inactiveShape={(props: any) => <Sector {...props} />}
            data={data}
            cx={120}
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}