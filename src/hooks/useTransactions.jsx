import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { calculateStats } from "../utils/helpers";

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage("paymemory_transactions", []);
  const [loading, setLoading] = useState(false);

  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [
      {
        ...transaction,
        id: Date.now(),
        date: new Date().toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        timeline: ["Transaction created"],
      },
      ...prev,
    ]);
  }, [setTransactions]);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...updates,
              timeline: [...(t.timeline || []), updates.timelineEntry || "Transaction updated"],
            }
          : t
      )
    );
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, [setTransactions]);

  const getTransaction = useCallback((id) => {
    return transactions.find((t) => t.id === id) || null;
  }, [transactions]);

  const stats = calculateStats(transactions);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
    stats,
    loading,
  };
}
