import React, { useState } from "react";

const SignUpHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "publish" | "engage">(
    "create"
  );

  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return (
          <>
            {/* Blog Editor Mockup */}
            <div className="space-y-2">
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-3 bg-gray-600 rounded mb-2"></div>
                <div className="space-y-1">
                  <div className="w-full h-2 bg-gray-600 rounded"></div>
                  <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
                  <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
                <div className="w-6 h-6 bg-gray-700 rounded"></div>
              </div>

              {/* Content Area */}
              <div className="bg-gray-800 rounded p-2 space-y-1">
                <div className="w-full h-2 bg-gray-600 rounded"></div>
                <div className="w-5/6 h-2 bg-gray-600 rounded"></div>
                <div className="w-4/5 h-2 bg-gray-600 rounded"></div>
                <div className="w-2/3 h-2 bg-gray-600 rounded"></div>
              </div>
            </div>
          </>
        );

      case "publish":
        return (
          <>
            {/* Publishing Dashboard */}
            <div className="space-y-2">
              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="w-20 h-2 bg-gray-600 rounded"></div>
                  <div className="w-12 h-4 bg-green-500 rounded text-xs"></div>
                </div>
                <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
              </div>

              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="w-16 h-2 bg-gray-600 rounded"></div>
                  <div className="w-12 h-4 bg-blue-500 rounded text-xs"></div>
                </div>
                <div className="w-2/3 h-2 bg-gray-600 rounded"></div>
              </div>

              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <div className="w-24 h-2 bg-gray-600 rounded"></div>
                  <div className="w-12 h-4 bg-yellow-500 rounded text-xs"></div>
                </div>
                <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-3 grid grid-cols-3 gap-1">
              <div className="bg-blue-500 h-6 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-white rounded"></div>
              </div>
              <div className="bg-green-500 h-6 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-white rounded"></div>
              </div>
              <div className="bg-purple-500 h-6 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-white rounded"></div>
              </div>
            </div>
          </>
        );

      case "engage":
        return (
          <>
            {/* Engagement Analytics */}
            <div className="space-y-2">
              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="w-16 h-2 bg-gray-600 rounded"></div>
                  <div className="w-8 h-2 bg-gray-600 rounded ml-auto"></div>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded">
                  <div className="w-3/4 h-1 bg-blue-500 rounded"></div>
                </div>
              </div>

              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="w-12 h-2 bg-gray-600 rounded"></div>
                  <div className="w-6 h-2 bg-gray-600 rounded ml-auto"></div>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded">
                  <div className="w-1/2 h-1 bg-green-500 rounded"></div>
                </div>
              </div>

              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <div className="w-14 h-2 bg-gray-600 rounded"></div>
                  <div className="w-10 h-2 bg-gray-600 rounded ml-auto"></div>
                </div>
                <div className="w-full h-1 bg-gray-700 rounded">
                  <div className="w-5/6 h-1 bg-purple-500 rounded"></div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative h-full flex items-center justify-center bg-gradient-to-r from-primary to-[#FF6B35] p-8">
      <div className="text-center text-white max-w-md">
        {/* Laptop Illustration */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-3 shadow-2xl mx-auto w-80 h-48 relative">
            {/* Laptop Screen */}
            <div className="bg-gray-900 rounded-md h-full w-full overflow-hidden">
              {/* Dashboard UI Mockup */}
              <div className="p-3 h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-400">Balosh Blog</div>
                </div>

                {/* Navigation */}
                <div className="flex space-x-2 mb-3">
                  <button
                    onClick={() => setActiveTab("create")}
                    className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                      activeTab === "create"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setActiveTab("publish")}
                    className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                      activeTab === "publish"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => setActiveTab("engage")}
                    className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                      activeTab === "engage"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Engage
                  </button>
                </div>

                {/* Dynamic Content */}
                {renderContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-4xl font-bold mb-4">Start Your Blogging Journey</h2>
        <p className="text-xl opacity-90">
          Join thousands of writers sharing their stories with the world
        </p>
      </div>
    </div>
  );
};

export default SignUpHero;
