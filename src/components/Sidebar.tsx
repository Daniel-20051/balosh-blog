import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isSidebarOpen: boolean;
  onLogout: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  onLogout,
  onClose,
}) => {
  const location = useLocation();

  // Handle click outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      const target = event.target as Element;

      if (isSidebarOpen && sidebar && !sidebar.contains(target)) {
        onClose();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, onClose]);

  // Handle menu item click to close sidebar on mobile
  const handleMenuClick = () => {
    // Only close on mobile (screen width < 1024px)
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      name: "New Blog",
      href: "/new-blog",
      icon: (
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
      ),
    },
    {
      name: "All Blogs",
      href: "/all-blogs",
      icon: (
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      name: "Categories",
      href: "/categories",
      icon: (
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <aside
      id="sidebar"
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${
        isSidebarOpen ? "w-64" : "w-16"
      } fixed lg:sticky top-16 h-[calc(100vh-4rem)] bg-gray-100 transition-all duration-300 ease-in-out overflow-y-auto z-50 lg:z-auto`}
    >
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleMenuClick}
                className={`flex items-center justify-center ${
                  isSidebarOpen ? "justify-start space-x-3 px-3" : "px-2"
                } py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-[#f88326] text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout Section */}
        <div className="mt-8 px-4">
          <div className="border-t border-gray-300 pt-4">
            <button
              onClick={() => {
                onLogout();
                handleMenuClick(); // Also close sidebar on logout
              }}
              className={`flex cursor-pointer items-center justify-center ${
                isSidebarOpen ? "justify-start space-x-3 px-3" : "px-2"
              } py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full`}
              title={!isSidebarOpen ? "Logout" : undefined}
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {isSidebarOpen && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
