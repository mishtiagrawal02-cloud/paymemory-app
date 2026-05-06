export function formatMoney(amount) {
  return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
}

export function getCategoryTotal(transactions, category) {
  return transactions
    .filter((item) => item.category === category && item.type === "sent")
    .reduce((sum, item) => sum + item.amount, 0);
}

export function getStats(transactions) {
  const totalSent = transactions
    .filter((item) => item.type === "sent")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalReceived = transactions
    .filter((item) => item.type === "received")
    .reduce((sum, item) => sum + item.amount, 0);

  const pending = transactions.reduce(
    (sum, item) => sum + item.pendingAmount,
    0
  );

  const reminders = transactions.filter((item) => item.reminder).length;

  const documented = transactions.filter(
    (item) => item.note && item.tags.length && item.attachment
  ).length;

  const score = Math.round((documented / transactions.length) * 100);

  return { totalSent, totalReceived, pending, reminders, score };
}