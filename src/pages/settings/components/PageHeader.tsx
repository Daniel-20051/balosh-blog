import React from "react";

interface PageHeaderProps {
  onSaveChanges: () => void | Promise<void>;
  isSaving?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  onSaveChanges,
  isSaving = false,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Manage your profile information and preferences
        </p>
      </div>
      <button
        onClick={onSaveChanges}
        disabled={isSaving}
        className="bg-[#f88326] text-white px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2 hover:bg-[#e6761f] transition-colors w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Saving...</span>
          </>
        ) : (
          <>
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
          </>
        )}
      </button>
    </div>
  );
};

export default PageHeader;
