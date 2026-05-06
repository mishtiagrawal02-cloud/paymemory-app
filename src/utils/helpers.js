export function formatMoney(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

export function getCategoryTotal(transactions, category) {
  return transactions
    .filter((item) => item.category === category && item.type === "spent")
    .reduce((sum, item) => sum + item.amount, 0);
}

export function calculateStats(transactions) {
  const totalReceived = transactions
    .filter((item) => item.type === "received")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalSpent = transactions
    .filter((item) => item.type === "spent")
    .reduce((sum, item) => sum + item.amount, 0);

  const pendingCount = transactions.filter(
    (item) => item.status === "pending"
  ).length;

  const overdueCount = transactions.filter(
    (item) => item.status === "overdue"
  ).length;

  const reminders = transactions.filter((item) => item.reminder).length;

  const documented = transactions.filter(
    (item) => item.note && item.tags.length > 0
  ).length;

  const score = transactions.length > 0
    ? Math.round((documented / transactions.length) * 100)
    : 72;

  return { totalReceived, totalSpent, pendingCount, overdueCount, reminders, score };
}

export function getStats(transactions) {
  return calculateStats(transactions);
}