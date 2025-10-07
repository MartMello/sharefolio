"use client";

import { Check } from 'lucide-react';

const COLORS = ['#005F73', '#0A9396', '#94D2BD', '#E9D8A6', '#EE9B00'];

type LegendProps = {
  data: { x: string; y: number }[];
  clickedIndex: number | null;
  setClickedIndex: (index: number) => void;
  setHoverIndex: (index: number | null) => void;
};

export default function Legend({ data, clickedIndex, setClickedIndex, setHoverIndex }: LegendProps) {
  return (
    <div className="space-y-4">
      {data.map((entry, index) => (
        <label
          key={`item-${index}`}
          className="flex items-center gap-3 cursor-pointer"
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <input
            type="radio"
            name="pie-segment"
            className="hidden"
            checked={clickedIndex === index}
            onChange={() => setClickedIndex(index)} // This is the fix
          />
          <div
            className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              backgroundColor: clickedIndex === index ? COLORS[index % COLORS.length] : 'transparent',
              borderColor: COLORS[index % COLORS.length]
            }}
          >
            {clickedIndex === index && <Check className="w-4 h-4 text-white" />}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`font-semibold text-lg ${clickedIndex === index ? 'text-primary' : 'text-neutral-medium'}`}>
              {entry.x}
            </span>
            <span className="text-neutral-medium text-sm">{entry.y.toFixed(0)}%</span>
          </div>
        </label>
      ))}
    </div>
  );
}