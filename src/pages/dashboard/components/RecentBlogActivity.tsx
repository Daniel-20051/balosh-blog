import React from "react";

interface Blog {
  id: number;
  title: string;
  author: string;
  time: string;
  status: string;
  avatar: string | null;
}

interface RecentBlogActivityProps {
  blogs: Blog[];
  isLoading?: boolean;
}

const RecentBlogActivity: React.FC<RecentBlogActivityProps> = ({
  blogs,
  isLoading = false,
}) => {
  // Function to get status color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-[#000000]">
          Recent Blog Activity
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {isLoading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="px-4 lg:px-6 py-4">
                <div className="flex items-center space-x-3 lg:space-x-4 animate-pulse">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-3 lg:h-4 bg-gray-200 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div className="flex-shrink-0">
                    <div className="h-5 w-16 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          : blogs.map((blog) => (
              <div key={blog.id} className="px-4 lg:px-6 py-4">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {blog.avatar ? (
                      <img
                        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                        src={blog.avatar}
                        alt={blog.author}
                      />
                    ) : (
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-[#F48125] to-[#FF6B35] flex items-center justify-center">
                        <span className="text-white uppercase text-xs lg:text-sm font-medium">
                          {blog.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#000000] truncate">
                      {blog.title}
                    </p>
                    <p className="text-xs lg:text-sm text-gray-500">
                      {blog.status === "Published"
                        ? "Published"
                        : blog.status === "Draft"
                        ? "Draft saved"
                        : "Under review"}{" "}
                      {blog.time} by {blog.author}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 lg:px-2.5 lg:py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        blog.status
                      )}`}
                    >
                      {blog.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default RecentBlogActivity;
