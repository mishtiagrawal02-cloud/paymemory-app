import { useState, useCallback, useMemo } from "react";

export function useFilters(transactions) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeStatus, setActiveStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch =
          search === "" ||
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.upiId.toLowerCase().includes(search.toLowerCase()) ||
          t.note.toLowerCase().includes(search.toLowerCase()) ||
          t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

        const matchesCategory = activeCategory === "All" || t.category === activeCategory;

        const matchesStatus = activeStatus === "All" || t.status === activeStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return b.id - a.id;
          case "oldest":
            return a.id - b.id;
          case "highest":
            return b.amount - a.amount;
          case "lowest":
            return a.amount - b.amount;
          case "overdue":
            return (a.status === "overdue" ? -1 : 1) - (b.status === "overdue" ? -1 : 1);
          default:
            return 0;
        }
      });
  }, [transactions, search, activeCategory, activeStatus, sortBy]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setActiveCategory("All");
    setActiveStatus("All");
    setSortBy("newest");
  }, []);

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    activeStatus,
    setActiveStatus,
    sortBy,
    setSortBy,
    filteredTransactions,
    resetFilters,
  };
}
