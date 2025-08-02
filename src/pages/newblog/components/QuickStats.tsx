import React from "react";

interface QuickStatsProps {
  wordCount: number;
  readingTime: number;
  lastSaved: string;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  wordCount,
  readingTime,
  lastSaved,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Word Count</span>
          <span className="text-sm font-medium text-gray-900">{wordCount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Reading Time</span>
          <span className="text-sm font-medium text-gray-900">
            {readingTime} min
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Last Saved</span>
          <span className="text-sm font-medium text-gray-900">{lastSaved}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
