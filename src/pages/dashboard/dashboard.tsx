import React from "react";
import ButtonLink from "../../components/ButtonLink";
import SummaryCards from "./components/SummaryCards";
import RecentBlogActivity from "./components/RecentBlogActivity";

const Dashboard: React.FC = () => {
  const recentBlogs = [
    {
      id: 1,
      title: "The Future of Web Design Trends",
      author: "John Doe",
      time: "2 hours ago",
      status: "Published",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      title: "Understanding User Experience Principles",
      author: "Sarah Smith",
      time: "1 day ago",
      status: "Draft",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 4,
      title: "Mobile-First Design Strategies",
      author: "Emma Wilson",
      time: "5 days ago",
      status: "Review",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 5,
      title: "Advanced JavaScript Patterns",
      author: "Alex Chen",
      time: "1 week ago",
      status: "Pending",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    },
  ];

  const summaryCards = [
    {
      title: "Total Blogs",
      value: "247",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Likes",
      value: "3.2K",
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  const newBlogIcon = (
    <svg
      className="w-4 h-4"
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
  );

  const allBlogsIcon = (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Dashboard Title and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#000000]">
          Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ButtonLink
            to="/new-blog"
            variant="primary"
            icon={newBlogIcon}
            mobileText="New Blog"
            desktopText="New Blog"
          />
          <ButtonLink
            to="/all-blogs"
            variant="secondary"
            icon={allBlogsIcon}
            mobileText="All Blogs"
            desktopText="View All Blogs"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards cards={summaryCards} />

      {/* Recent Blog Activity */}
      <RecentBlogActivity blogs={recentBlogs} />
    </div>
  );
};

export default Dashboard;
