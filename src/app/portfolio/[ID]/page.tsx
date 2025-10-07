"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import PortfolioPieChart from "@/components/ui/charts/PortfolioPieChart";
import Legend from "@/components/ui/charts/legend";

// --- MOCK DATA ---
const mockPortfolio = [
  { name: "Apple Inc.", ticker: "AAPL", value: 15000, gainLossValue: 2500, gainLossPercent: 20, weight: 30, type: "stock", sector: "Technology" },
  { name: "Microsoft Corp.", ticker: "MSFT", value: 25000, gainLossValue: -1500, gainLossPercent: -5.66, weight: 50, type: "stock", sector: "Technology" },
  { name: "Tesla Inc.", ticker: "TSLA", value: 10000, gainLossValue: 5000, gainLossPercent: 100, weight: 20, type: "stock", sector: "Automotive" },
];

// --- COMPONENT ---

export default function PortfolioPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Separate states for hover and click, starting with nothing selected.
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null); // Changed initial state to null

  // Determine the active slice: prioritize hover, otherwise use the clicked state.
  const activeIndex = hoverIndex !== null ? hoverIndex : clickedIndex;

  const chartData = mockPortfolio.reduce((acc, stock) => {
    const existing = acc.find(item => item.name === stock.sector);
    if (existing) {
      existing.value += stock.weight;
    } else {
      acc.push({ name: stock.sector, value: stock.weight });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const legendData = chartData.map(item => ({ x: item.name, y: item.value }));

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
    });
    setLoading(false);
  }, [id, router]);

  const handleLegendClick = (index: number) => {
    // If clicking the already selected item, unselect it. Otherwise, select the new one.
    setClickedIndex(clickedIndex === index ? null : index);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">My Portfolio</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Distribution</h2>
        <div className="p-8 bg-white rounded-xl shadow-md flex items-center">
          <div>
            <PortfolioPieChart
              data={chartData}
              activeIndex={activeIndex}
              onPieEnter={(_, index) => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          </div>
          <div className="ml-8">
            <Legend
              data={legendData}
              clickedIndex={clickedIndex}
              setClickedIndex={handleLegendClick} // Use the new toggle function
              setHoverIndex={setHoverIndex}
            />
          </div>
        </div>
      </div>

      {/* Holdings Table... */}
      {/* ... your table code remains here ... */}
    </div>
  );
}