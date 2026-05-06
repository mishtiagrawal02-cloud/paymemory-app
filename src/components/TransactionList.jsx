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
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
              scale: 0.95,
            },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
            },
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: index * 0.05,
          }}
          whileHover={{ y: -8 }}
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