"use client";

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip } from 'recharts';

// Types
interface PortfolioItem {
  ticker: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
}

interface ChartDataItem {
  name: string;
  value: number;
  percentage: string;
}

interface SelectedTickersState {
  [ticker: string]: boolean;
}

interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: {
    name: string;
    percentage: string;
  }
}

// Mock data - in real app, fetch from Supabase
const mockPortfolioData: PortfolioItem[] = [
  { ticker: 'AAPL', quantity: 50, avgPrice: 150, currentPrice: 175, value: 8750 },
  { ticker: 'GOOGL', quantity: 30, avgPrice: 120, currentPrice: 140, value: 4200 },
  { ticker: 'MSFT', quantity: 40, avgPrice: 280, currentPrice: 320, value: 12800 },
  { ticker: 'TSLA', quantity: 25, avgPrice: 200, currentPrice: 180, value: 4500 },
  { ticker: 'AMZN', quantity: 35, avgPrice: 130, currentPrice: 145, value: 5075 },
];

const COLORS = ['#0A9396', '#005F73', '#94D2BD', '#E9D8A6', '#EE9B00'];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

  return (
    <g style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.2))' }}>
      <text x={cx} y={cy - 10} textAnchor="middle" fill={fill} className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#666" className="text-sm">
        {payload.percentage}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#fff"
        strokeWidth={2}
      />
    </g>
  );
};

interface TooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: {
      percentage: string;
    };
  }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-bold text-gray-800">{`${payload[0].name}`}</p>
        <p className="text-gray-600">{`Value: ${formatCurrency(payload[0].value)}`}</p>
        <p className="text-gray-600">{`Percentage: ${payload[0].payload.percentage}%`}</p>
      </div>
    );
  }

  return null;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};


export default function PortfolioPage() {
  const [selectedTickers, setSelectedTickers] = useState<SelectedTickersState>(
    mockPortfolioData.reduce((acc, item) => ({ ...acc, [item.ticker]: true }), {} as SelectedTickersState)
  );
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  const totalValue = mockPortfolioData.reduce((sum, item) => sum + item.value, 0);

  const chartData: ChartDataItem[] = mockPortfolioData
    .filter(item => selectedTickers[item.ticker])
    .map(item => ({
      name: item.ticker,
      value: item.value,
      percentage: ((item.value / totalValue) * 100).toFixed(1),
    }));

  const handleCheckboxChange = (ticker: string) => {
    setSelectedTickers(prev => ({
      ...prev,
      [ticker]: !prev[ticker],
    }));
  };

  const handlePieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(undefined);
  };

  const calculateGainLoss = (item: PortfolioItem) => {
    const cost = item.quantity * item.avgPrice;
    const current = item.value;
    const gain = current - cost;
    const percentage = ((gain / cost) * 100).toFixed(2);
    return { gain, percentage };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-2 tracking-tight">My Portfolio</h1>
          <p className="text-gray-500 text-lg">Total Portfolio Value: <span className="text-3xl font-semibold text-teal-600 tracking-tight">{formatCurrency(totalValue)}</span></p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Pie Chart Section */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">Portfolio Allocation</h2>
            <div className="h-96 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={150}
                    dataKey="value"
                    onMouseEnter={handlePieEnter}
                    onMouseLeave={handlePieLeave}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center content */}
              {chartData.length > 0 && activeIndex === undefined && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Total Value</div>
                    <div className="text-3xl font-bold text-teal-600 tracking-tight">
                      {formatCurrency(chartData.reduce((sum, item) => sum + item.value, 0))}
                    </div>
                    <div className="text-xs text-gray-400 mt-2 uppercase tracking-wider">
                      {chartData.length} {chartData.length === 1 ? 'Asset' : 'Assets'}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {chartData.length === 0 && (
              <p className="text-center text-gray-500 mt-8">Select at least one asset to view the chart</p>
            )}
          </div>

          {/* Legend with Checkboxes */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 tracking-tight">Holdings</h2>
            <div className="space-y-4">
              {mockPortfolioData.map((item, index) => {
                const { gain, percentage } = calculateGainLoss(item);
                const isPositive = gain >= 0;
                const color = COLORS[index % COLORS.length];

                return (
                  <div
                    key={item.ticker}
                    className={`flex items-start p-4 rounded-xl border-2 transition-all duration-300 ease-in-out ${
                      selectedTickers[item.ticker]
                        ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                        : 'border-gray-200 bg-gray-50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={item.ticker}
                      checked={selectedTickers[item.ticker]}
                      onChange={() => handleCheckboxChange(item.ticker)}
                      className="mt-1 h-5 w-5 rounded-md border-gray-300 text-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer"
                    />
                    <label htmlFor={item.ticker} className="ml-4 flex-1 cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-semibold text-gray-800 text-lg">{item.ticker}</span>
                        </div>
                        <span className="font-semibold text-gray-800 text-lg">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>{item.quantity} shares @ {formatCurrency(item.currentPrice)}</span>
                          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '▲' : '▼'} {formatCurrency(gain)} ({percentage}%)
                          </span>
                        </div>
                        {selectedTickers[item.ticker] && chartData.length > 0 && (
                          <div className="text-xs text-gray-500 pt-1">
                            Portfolio allocation: {((item.value / totalValue) * 100).toFixed(1)}%
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-md font-medium text-gray-500 mb-2 tracking-wide">Total Invested</h3>
            <p className="text-4xl font-bold text-gray-800 tracking-tight">
              {formatCurrency(mockPortfolioData.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0))}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-md font-medium text-gray-500 mb-2 tracking-wide">Current Value</h3>
            <p className="text-4xl font-bold text-teal-600 tracking-tight">
              {formatCurrency(totalValue)}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-md font-medium text-gray-500 mb-2 tracking-wide">Total Gain/Loss</h3>
            <p className={`text-4xl font-bold tracking-tight ${
              totalValue - mockPortfolioData.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0) >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {formatCurrency(totalValue - mockPortfolioData.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}