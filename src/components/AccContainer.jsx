import React, { useState, useEffect } from "react";
import TransactionsList from './Transactionslist';
import NavBar from "./NavBar";
import AddTransactionForm from "./AddTransactionForm";

function AccContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3001/transactions");
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const addTransaction = async (newTransaction) => {
    try {
      const response = await fetch("http://localhost:3001/transactions", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }
      const data = await response.json();
      setTransactions([...transactions, data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="nav">
      <NavBar onSearch={handleSearch} />
      <AddTransactionForm onAddTransaction={addTransaction} />
      <TransactionsList transactions={transactions} searchTerm={searchTerm} />
    </div>
  );
}

export default AccContainer;