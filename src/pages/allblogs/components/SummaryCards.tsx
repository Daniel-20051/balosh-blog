import React from "react";

interface SummaryCard {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface SummaryCardsProps {
  cards: SummaryCard[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <div className={`w-6 h-6 ${card.iconColor}`}>{card.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
