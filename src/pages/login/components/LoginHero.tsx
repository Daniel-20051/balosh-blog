import React, { useState } from "react";

const LoginHero: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "posts" | "comments"
  >("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-2/3 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-4/5 h-2 bg-gray-600 rounded"></div>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-3 flex space-x-1">
              <div className="bg-blue-500 h-8 rounded flex-1"></div>
              <div className="bg-green-500 h-8 rounded flex-1"></div>
              <div className="bg-yellow-500 h-8 rounded flex-1"></div>
              <div className="bg-purple-500 h-8 rounded flex-1"></div>
            </div>
          </>
        );

      case "posts":
        return (
          <>
            {/* Posts List */}
            <div className="space-y-2">
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-3 bg-gray-600 rounded mb-1"></div>
                <div className="w-2/3 h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-1/4 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-3 bg-gray-600 rounded mb-1"></div>
                <div className="w-3/4 h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-1/3 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="w-full h-3 bg-gray-600 rounded mb-1"></div>
                <div className="w-1/2 h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-1/5 h-2 bg-gray-600 rounded"></div>
              </div>
            </div>
          </>
        );

      case "comments":
        return (
          <>
            {/* Comments List */}
            <div className="space-y-2">
              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  <div className="w-16 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-3/4 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  <div className="w-20 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-1/2 h-2 bg-gray-600 rounded"></div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  <div className="w-12 h-2 bg-gray-600 rounded"></div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded mb-1"></div>
                <div className="w-2/3 h-2 bg-gray-600 rounded"></div>
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
                    onClick={() => setActiveTab("dashboard")}
                    className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                      activeTab === "dashboard"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab("posts")}
                    className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                      activeTab === "posts"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Posts
                  </button>
                  <button
                    onClick={() => setActiveTab("comments")}
                    className={`text-xs px-2 py-1 rounded transition-colors duration-200 ${
                      activeTab === "comments"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    Comments
                  </button>
                </div>

                {/* Dynamic Content */}
                {renderContent()}
              </div>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-4xl font-bold mb-4">Welcome to Balosh Blog</h2>
        <p className="text-xl opacity-90">
          Create, manage, and share your stories with the world
        </p>
      </div>
    </div>
  );
};

export default LoginHero;
