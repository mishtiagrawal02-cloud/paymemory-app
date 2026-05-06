import { motion } from "framer-motion";
import SummaryCard from "./SummaryCard";
import { formatMoney } from "../utils/helpers";

function SummarySection({ cards }) {
  return (
    <motion.section
      className="summary-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
        >
          <SummaryCard
            title={card.title}
            value={card.type === "money" ? formatMoney(card.value) : card.value}
            icon={card.icon}
            delay={0.05 * (index + 1)}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}

export default SummarySection;