import React from "react";

interface PageHeaderProps {
  onAddCategory: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onAddCategory }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-2">
          Manage your blog categories and organize your content
        </p>
      </div>
      <button
        onClick={onAddCategory}
        className="bg-black cursor-pointer text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Add Category</span>
      </button>
    </div>
  );
};

export default PageHeader;
