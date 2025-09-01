// src/components/TrendLineChart.js
import React, { useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import dayjs from "dayjs";

function TrendLineChart({ transactions }) {
  const [view, setView] = useState("month"); // "month" or "week"

  // Aggregate transactions based on view
  const data = useMemo(() => {
    const map = {};

    transactions.forEach((txn) => {
      let key;
      if (view === "month") {
        key = dayjs(txn.createdAt).format("YYYY-MM");
      } else {
        key = dayjs(txn.createdAt).startOf("week").format("YYYY-MM-DD");
      }

      if (!map[key]) map[key] = 0;
      map[key] += txn.amount;
    });

    // Convert map to array sorted by date
    return Object.entries(map)
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions, view]);

  return (
    <div className="mb-6">
      <div className="mb-2">
        <button onClick={() => setView("week")} className="mr-2 px-2 py-1 bg-gray-200 rounded">Weekly</button>
        <button onClick={() => setView("month")} className="px-2 py-1 bg-gray-200 rounded">Monthly</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" name="Spending" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrendLineChart;
