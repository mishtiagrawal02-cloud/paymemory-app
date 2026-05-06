import { motion } from "framer-motion";
import TransactionCard from "./TransactionCard";

function TransactionList({
  transactions,
  selectedId,
  setSelectedId,
}) {
  return (
    <motion.div
      className="transaction-bento-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {transactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 30,
              scale: 0.96,
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
            },
          }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
        >
          <TransactionCard
            transaction={transaction}
            selected={selectedId === transaction.id}
            onClick={() => setSelectedId(transaction.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TransactionList;