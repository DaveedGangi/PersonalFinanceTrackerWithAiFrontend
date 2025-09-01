import React, { useState } from "react";
import axios from "axios";
import CategoryPieChart from "./CategoryPieChart";
import TrendLineChart from "./TrendLineChart";
import "./TransactionList.css";

function TransactionList({ transactions, setTransactions }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ amount: "", category: "", description: "" });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`https://personalfinancewithaidaveed.onrender.com/api/transactions/${id}`);
    setTransactions(transactions.filter(t => t._id !== id));
  };

  // Start editing
  const startEdit = (t) => {
    setEditingId(t._id);
    setEditData({ amount: t.amount, category: t.category, description: t.description });
  };

  // Save edit
  const saveEdit = async (id) => {
    const res = await axios.put(`https://personalfinancewithaidaveed.onrender.com/api/transactions/${id}`, editData);
    setTransactions(transactions.map(t => (t._id === id ? res.data : t)));
    setEditingId(null);
  };

  // Unique categories
  const categories = ["All", ...new Set(transactions.map(t => t.category))];

  // Apply filter + search
  const filteredTransactions = transactions.filter(t => {
    const matchCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="transaction-list-container">
      <h1 className="dashboard-title">Finance Dashboard</h1>

      {transactions.length === 0 ? (
        <div className="empty-message">No transactions yet</div>
      ) : (
        <div>
          {/* Summary */}
          <div className="summary-cards">
            <div className="summary-card income-card">
              <div className="card-title">Income</div>
              <div className="card-value">
                ₹{transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0)}
              </div>
            </div>
            <div className="summary-card expenses-card">
              <div className="card-title">Expenses</div>
              <div className="card-value">
                ₹{transactions.filter(t => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0)}
              </div>
            </div>
            <div className="summary-card savings-card">
              <div className="card-title">Savings</div>
              <div className="card-value">
                ₹{transactions.reduce((sum, t) => sum + t.amount, 0)}
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="charts-container">
            <div className="chart-wrapper">
              <CategoryPieChart transactions={transactions} />
            </div>
            <div className="chart-wrapper">
              <TrendLineChart transactions={transactions} />
            </div>
          </div>

          {/* Filter & Search */}
          <div className="filter-search">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-dropdown"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Search description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Transaction History */}
        {/* Transaction History */}
<div className="transaction-history">
  <h2 className="section-title">Transaction History</h2>
  <div className="transaction-list">
    {filteredTransactions.length === 0 ? (
      <div className="empty-message">No results found</div>
    ) : (
      filteredTransactions.map((t) => (
        <div key={t._id} className="transaction-item">
          {editingId === t._id ? (
            <div className="edit-form">
              <input
                type="number"
                value={editData.amount}
                onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                className="edit-input"
              />
              <input
                type="text"
                value={editData.category}
                onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                className="edit-input"
              />
              <input
                type="text"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="edit-input"
              />
              <div className="edit-actions">
                <button onClick={() => saveEdit(t._id)} className="save-button">Save</button>
                <button onClick={() => setEditingId(null)} className="cancel-button">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="transaction-info">
                <span className="transaction-category">{t.category}</span>
                <span className="transaction-description">{t.description}</span>
              </div>
              <div className="transaction-details">
                <span className={`transaction-amount ${t.amount < 0 ? 'negative' : 'positive'}`}>
                  ₹{t.amount}
                </span>
                <div className="transaction-actions">
                  <button onClick={() => startEdit(t)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(t._id)} className="delete-button">Delete</button>
                </div>
              </div>
            </>
          )}
        </div>
      ))
    )}
  </div>
</div>

        </div>
      )}
    </div>
  );
}

export default TransactionList;
