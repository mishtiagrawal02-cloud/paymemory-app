import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import DashboardHeader from "./DashboardHeader";
import SummarySection from "./SummarySection";
import TransactionList from "./TransactionList";
import SearchFilterPanel from "./SearchFilterPanel";
import TransactionDetails from "./TransactionDetails";
import EmptyState from "./EmptyState";
import AddTransactionModal from "./AddTransactionModal";
import RemindersPanel from "./RemindersPanel";
import { useTransactions } from "../hooks/useTransactions.jsx";
import { useFilters } from "../hooks/useFilters.jsx";
import { useFinancialHealth } from "../hooks/useFinancialHealth.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { Wallet, TrendingUp, Clock3, AlertCircle } from "lucide-react";

function Dashboard() {
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { transactions, addTransaction, updateTransaction, deleteTransaction, stats } = useTransactions();
  const { search, setSearch, activeCategory, setActiveCategory, activeStatus, setActiveStatus, sortBy, setSortBy, filteredTransactions, resetFilters } = useFilters(transactions);
  const { healthScore, healthStatus } = useFinancialHealth(transactions);
  const { success, error } = useToast();

  const summaryCards = [
    {
      title: "Total Received",
      value: stats.totalReceived,
      type: "money",
      icon: <TrendingUp />,
    },
    {
      title: "Total Spent",
      value: stats.totalSpent,
      type: "money",
      icon: <Wallet />,
    },
    {
      title: "Pending",
      value: stats.pendingCount,
      type: "number",
      icon: <Clock3 />,
    },
    {
      title: "Overdue",
      value: stats.overdueCount,
      type: "number",
      icon: <AlertCircle />,
    },
  ];

  const selectedTransaction =
    selectedId !== null
      ? transactions.find((t) => t.id === selectedId)
      : null;

  function handleAddTransaction(transactionData) {
    addTransaction(transactionData);
    success("Transaction added successfully!");
  }

  function handleUpdateTransaction(updatedTransaction) {
    updateTransaction(updatedTransaction.id, updatedTransaction);
    success("Transaction updated successfully!");
  }

  function handleDeleteTransaction(id) {
    deleteTransaction(id);
    setSelectedId(null);
    success("Transaction deleted successfully!");
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <div className="dashboard-container">
      <Navbar onAdd={handleOpenModal} />

      <DashboardHeader score={healthScore} healthStatus={healthStatus} />

      <SummarySection cards={summaryCards} />

      <div className="main-grid">
        <div className="left-panel">
          <SearchFilterPanel
            search={search}
            setSearch={setSearch}
            categories={["All", "Food", "Transport", "Shopping", "Bills", "Rent", "Loan", "Subscription", "Travel", "College", "Project", "Other"]}
            statuses={["All", "settled", "pending", "follow-up", "overdue"]}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeStatus={activeStatus}
            setActiveStatus={setActiveStatus}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={resetFilters}
          />

          {filteredTransactions.length === 0 ? (
            <EmptyState onClearFilters={resetFilters} />
          ) : (
            <TransactionList
              transactions={filteredTransactions}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          )}
        </div>

        <div className="right-panel">
          <AnimatePresence mode="wait">
            {selectedTransaction ? (
              <TransactionDetails
                key={`details-${selectedTransaction.id}`}
                transaction={selectedTransaction}
                onUpdate={handleUpdateTransaction}
                onDelete={handleDeleteTransaction}
              />
            ) : (
              <RemindersPanel
                key="reminders-panel"
                transactions={transactions}
                onSelectTransaction={setSelectedId}
                onUpdateTransaction={handleUpdateTransaction}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTransaction}
      />
    </div>
  );
}

export default Dashboard;