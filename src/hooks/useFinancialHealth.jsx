import { useMemo } from "react";

export function useFinancialHealth(transactions) {
  const healthScore = useMemo(() => {
    if (transactions.length === 0) return 72;

    const totalTransactions = transactions.length;
    const settledTransactions = transactions.filter((t) => t.status === "settled").length;
    const overdueTransactions = transactions.filter((t) => t.status === "overdue").length;
    const pendingTransactions = transactions.filter((t) => t.status === "pending").length;

    const documentedTransactions = transactions.filter(
      (t) => t.note && t.tags.length > 0
    ).length;

    const onTimePayments = settledTransactions / (totalTransactions || 1);
    const overduePenalty = overdueTransactions * 10;
    const pendingPenalty = pendingTransactions * 5;
    const documentationBonus = (documentedTransactions / totalTransactions) * 20;

    let score = 50 + (onTimePayments * 30) + documentationBonus - overduePenalty - pendingPenalty;

    score = Math.max(0, Math.min(100, score));

    return Math.round(score);
  }, [transactions]);

  const healthStatus = useMemo(() => {
    if (healthScore >= 80) return "Excellent";
    if (healthScore >= 60) return "Good";
    if (healthScore >= 40) return "Fair";
    return "Needs Attention";
  }, [healthScore]);

  const metrics = useMemo(() => {
    const paymentDiscipline = transactions.length > 0
      ? Math.round((transactions.filter((t) => t.status === "settled").length / transactions.length) * 100)
      : 75;

    const memoryCompleteness = transactions.length > 0
      ? Math.round((transactions.filter((t) => t.note && t.tags.length > 0).length / transactions.length) * 100)
      : 65;

    const onTimePayments = transactions.length > 0
      ? Math.round((transactions.filter((t) => t.status !== "overdue").length / transactions.length) * 100)
      : 70;

    return [
      { label: "Payment Discipline", value: paymentDiscipline },
      { label: "Memory Completeness", value: memoryCompleteness },
      { label: "On-time Payments", value: onTimePayments },
    ];
  }, [transactions]);

  return {
    healthScore,
    healthStatus,
    metrics,
  };
}
