"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Transaction = {
  id: string;
  asset: string;
  quantity: number;
  price: number;
  created_at: string;
};

export default function PortfolioPage() {
  const { id } = useParams(); // grabs [id] from the URL
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // redirect to login if not authenticated
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
      }
    });

    // fetch portfolio transactions
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from("transactions") // make sure this matches your table name
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching transactions:", error.message);
      } else {
        setTransactions(data as Transaction[]);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [id, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>

      {transactions.length === 0 ? (
        <p className="text-neutral-medium">
          No portfolio yet. Add your first transactions!
        </p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="p-4 bg-white shadow rounded flex justify-between"
            >
              <span className="font-medium">{tx.asset}</span>
              <span>
                {tx.quantity} × ${tx.price} ={" "}
                <b>${(tx.quantity * tx.price).toFixed(2)}</b>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
