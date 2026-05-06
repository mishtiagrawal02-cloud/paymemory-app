import SummaryCard from "./SummaryCard";
import { formatMoney } from "../utils/helpers";

function SummarySection({ cards }) {
  return (
    <section className="summary-grid">
      {cards.map((card, index) => (
        <SummaryCard
          key={card.title}
          title={card.title}
          value={card.type === "money" ? formatMoney(card.value) : card.value}
          icon={card.icon}
          delay={0.05 * (index + 1)}
        />
      ))}
    </section>
  );
}

export default SummarySection;