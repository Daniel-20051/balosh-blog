import React from "react";

interface PageHeaderProps {
  onSaveChanges: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onSaveChanges }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your profile information and preferences
        </p>
      </div>
      <button
        onClick={onSaveChanges}
        className="bg-[#f88326] text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-[#e6761f] transition-colors"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          />
        </svg>
        <span>Save Changes</span>
      </button>
    </div>
  );
};

export default PageHeader;
