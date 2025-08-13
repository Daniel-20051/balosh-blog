import React from "react";

interface SummaryCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface SummaryCardsProps {
  cards: SummaryCard[];
  isLoading?: boolean;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ cards, isLoading }) => {
  if (isLoading) {
    const placeholderCount = Math.max(cards.length, 2);
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 animate-pulse"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-7 bg-gray-200 rounded w-16" />
              </div>
              <div className="p-2 lg:p-3 rounded-lg bg-gray-200 w-8 h-8 lg:w-10 lg:h-10" />
            </div>
          </div>
        ))}
      </div>
    );
  }
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
