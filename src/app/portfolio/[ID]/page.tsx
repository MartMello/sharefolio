"use client";

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';

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
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props as ActiveShapeProps;

  return (
    <g>
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateGainLoss = (item: PortfolioItem) => {
    const cost = item.quantity * item.avgPrice;
    const current = item.value;
    const gain = current - cost;
    const percentage = ((gain / cost) * 100).toFixed(2);
    return { gain, percentage };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <p className="text-gray-600">Total Portfolio Value: <span className="text-2xl font-semibold text-teal-600">{formatCurrency(totalValue)}</span></p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pie Chart Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Allocation</h2>
            <div className="h-96 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    dataKey="value"
                    onMouseEnter={handlePieEnter}
                    onMouseLeave={handlePieLeave}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center content */}
              {chartData.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Total Value</div>
                    <div className="text-2xl font-bold text-teal-600">
                      {formatCurrency(chartData.reduce((sum, item) => sum + item.value, 0))}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
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
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Holdings</h2>
            <div className="space-y-3">
              {mockPortfolioData.map((item, index) => {
                const { gain, percentage } = calculateGainLoss(item);
                const isPositive = gain >= 0;
                const color = COLORS[index % COLORS.length];

                return (
                  <div
                    key={item.ticker}
                    className={`flex items-start p-4 rounded-lg border-2 transition-all ${
                      selectedTickers[item.ticker]
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={item.ticker}
                      checked={selectedTickers[item.ticker]}
                      onChange={() => handleCheckboxChange(item.ticker)}
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
                    />
                    <label htmlFor={item.ticker} className="ml-3 flex-1 cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: color }}
                          />
                          <span className="font-semibold text-gray-900">{item.ticker}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>{item.quantity} shares @ {formatCurrency(item.currentPrice)}</span>
                          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {isPositive ? '+' : ''}{formatCurrency(gain)} ({percentage}%)
                          </span>
                        </div>
                        {selectedTickers[item.ticker] && chartData.length > 0 && (
                          <div className="text-xs text-gray-500">
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
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Invested</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(mockPortfolioData.reduce((sum, item) => sum + (item.quantity * item.avgPrice), 0))}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Current Value</h3>
            <p className="text-2xl font-bold text-teal-600">
              {formatCurrency(totalValue)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Gain/Loss</h3>
            <p className={`text-2xl font-bold ${
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