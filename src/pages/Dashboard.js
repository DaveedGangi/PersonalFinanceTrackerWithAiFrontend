import React, { useEffect, useState } from "react";
import axios from "axios";
import TransactionInput from "../components/TransactionInput";
import TransactionList from "../components/TransactionList";
import Navbar from "./Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://personalfinancewithaidaveed.onrender.com/auth/me", { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
        if (res.data.user?._id) {
          axios.get(`https://personalfinancewithaidaveed.onrender.com/api/transactions/${res.data.user._id}`)
            .then(tRes => setTransactions(tRes.data))
            .catch(err => console.error(err));
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-state"><h2>Loading...</h2></div>;
  if (!user) return <div className="error-state"><h2>Please login first</h2></div>;

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          {user.avatar && (
            <img src={user.avatar} alt="avatar" className="user-avatar" />
          )}
          <div className="user-info">
            <h1 className="welcome-title">Welcome, {user.name}</h1>
            <p className="user-email">{user.email}</p>
          </div>
        </div>

        <hr className="divider" />

        <TransactionInput userId={user._id} addTransaction={(newTx) => setTransactions([newTx, ...transactions])} />

        <hr className="divider" />

        <TransactionList transactions={transactions} setTransactions={setTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
