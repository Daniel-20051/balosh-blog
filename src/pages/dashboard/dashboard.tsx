import React, { useEffect, useState } from "react";
import ButtonLink from "../../components/ButtonLink";
import SummaryCards from "./components/SummaryCards";
import RecentBlogActivity from "./components/RecentBlogActivity";
import { getBlogStats, getRecentBlogs } from "./api";

const Dashboard: React.FC = () => {
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [isRecentLoading, setIsRecentLoading] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState<
    Array<{
      id: number;
      title: string;
      author: string;
      time: string;
      status: string;
      avatar: string | null;
    }>
  >([]);

  const summaryCards = [
    {
      title: "Total Blogs",
      value: totalBlogs,
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
      value: totalLikes,
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

  const fetchBlogStats = async () => {
    try {
      setIsStatsLoading(true);
      const response = await getBlogStats();
      setTotalBlogs(response.data.stats.totalBlogs);
      setTotalLikes(response.data.stats.totalLikes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsStatsLoading(false);
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      setIsRecentLoading(true);
      const response = await getRecentBlogs();
      const apiBlogs = Array.isArray(response.data.blogs)
        ? response.data.blogs
        : [];

      const toTitleCase = (s: string) =>
        s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";

      const timeAgo = (iso?: string) => {
        if (!iso) return "";
        const then = new Date(iso).getTime();
        const now = Date.now();
        const diff = Math.max(0, Math.floor((now - then) / 1000));
        if (diff < 60) return "just now";
        const minutes = Math.floor(diff / 60);
        if (minutes < 60)
          return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
        const weeks = Math.floor(days / 7);
        return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
      };

      const mapped = apiBlogs.map((b: any, idx: number) => {
        const authorFirst = b?.author?.firstName || "";
        const authorLast = b?.author?.lastName || "";
        const authorUsername = b?.author?.username || "";
        const authorName = `${
          (authorFirst + " " + authorLast).trim() || authorUsername || "Unknown"
        }`;
        const statusRaw = String(b?.status);
        const status = toTitleCase(statusRaw);
        const date = b?.updatedAt;
        return {
          id: idx + 1,
          title: b?.title,
          author: authorName,
          time: timeAgo(date),
          status,
          avatar: b?.author?.profilePhoto || null,
        };
      });

      setRecentBlogs(mapped);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRecentLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogStats();
    fetchRecentBlogs();
  }, []);

  return (
    <div className="space-y-4 lg:space-y-6 pb-4">
      {/* Dashboard Title and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#000000]">
          Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <ButtonLink
            to="/admin/new-blog"
            variant="primary"
            icon={newBlogIcon}
            mobileText="New Blog"
            desktopText="New Blog"
          />
          <ButtonLink
            to="/admin/all-blogs"
            variant="secondary"
            icon={allBlogsIcon}
            mobileText="All Blogs"
            desktopText="View All Blogs"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards cards={summaryCards} isLoading={isStatsLoading} />

      {/* Recent Blog Activity */}
      <RecentBlogActivity blogs={recentBlogs} isLoading={isRecentLoading} />
    </div>
  );
};

export default Dashboard;
