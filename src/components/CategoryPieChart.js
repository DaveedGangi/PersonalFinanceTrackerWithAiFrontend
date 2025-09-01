// src/components/CategoryPieChart.js
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"];

function CategoryPieChart({ transactions }) {
  // Group transactions by category
  const data = useMemo(() => {
    const categoryMap = {};
    transactions.forEach((txn) => {
      categoryMap[txn.category] = (categoryMap[txn.category] || 0) + txn.amount;
    });
    return Object.entries(categoryMap).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  }, [transactions]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryPieChart;
