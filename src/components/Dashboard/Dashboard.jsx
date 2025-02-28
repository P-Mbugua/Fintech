import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      setTransactions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchTransactions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id} className="border-b p-2">
            {transaction.amount} - {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
