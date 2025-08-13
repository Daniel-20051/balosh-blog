import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api";

interface PageHeaderProps {
  selectedCategory: string;
  selectedStatus: string;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

const PageHeader = ({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
}: PageHeaderProps) => {
  const [categories, setCategories] = useState<any[]>([]);

  const handleCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleCategories();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[#000000]">All Blogs</h1>
        <p className="text-gray-600 mt-2">
          Manage and view all your blog posts
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] bg-gray-50"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* New Blog Button */}
        <Link
          to="/admin/new-blog"
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex items-center justify-center space-x-2 transition-colors"
        >
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
          <span>New Blog</span>
        </Link>
      </div>
    </div>
  );
};

export default PageHeader;
