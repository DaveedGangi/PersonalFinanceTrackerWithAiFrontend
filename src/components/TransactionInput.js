import React, { useState } from "react";
import axios from "axios";
import "./TransactionInput.css";

function TransactionInput({ userId, addTransaction }) {
  const [text, setText] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      showAlert("Please enter something", "error");
      return;
    }

    try {
      const res = await axios.post(
        "https://personalfinancewithaidaveed.onrender.com/api/transactions/parse",
        { text, userId },
        { withCredentials: true }
      );

      addTransaction(res.data); // instantly update the list
      setText("");
      showAlert("Transaction saved!", "success");
    } catch (err) {
      console.error(err);
      showAlert("Failed to save transaction", "error");
    }
  };

  return (
    <div className="transaction-input-container">
      <form onSubmit={handleSubmit} className="transaction-input-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='e.g. "Bought Starbucks coffee $6.50"'
          className="transaction-input-field"
        />
        <button 
          type="submit" 
          className="transaction-submit-btn"
          disabled={!userId}
        >
          Add Transaction
        </button>
      </form>
      
      {alert.show && (
        <div className={`transaction-alert ${alert.type}`}>
          {alert.message}
        </div>
      )}
    </div>
  );
}

export default TransactionInput;
