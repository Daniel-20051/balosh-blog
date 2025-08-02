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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl lg:text-3xl font-bold text-[#000000]">
                {card.value}
              </p>
            </div>
            <div className={`p-2 lg:p-3 ${card.bgColor} rounded-lg`}>
              <div className={`w-6 h-6 lg:w-8 lg:h-8 ${card.iconColor}`}>
                {card.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
