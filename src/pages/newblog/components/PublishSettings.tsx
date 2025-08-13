import { useEffect, useState } from "react";
import { getCategories } from "../api";

interface PublishSettingsProps {
  status: string;
  category: string;
  tags: string;
  author: string;
  onStatusChange: (status: string) => void;
  onCategoryChange: (category: string) => void;
  onTagsChange: (tags: string) => void;
  isCategoryEditable?: boolean;
}

const PublishSettings = ({
  status,
  category,
  tags,
  author,
  onStatusChange,
  onCategoryChange,
  onTagsChange,
  isCategoryEditable = true,
}: PublishSettingsProps) => {
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

  useEffect(() => {
    if (!category && categories.length > 0) {
      onCategoryChange(categories[0]._id);
    }
  }, [categories, category, onCategoryChange]);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Publish Settings
      </h3>

      <div className="space-y-4">
        {/* Status */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category || (categories[0]?._id ?? "")}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={!isCategoryEditable}
            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] ${
              !isCategoryEditable
                ? "bg-gray-100 cursor-not-allowed opacity-60"
                : ""
            }`}
          >
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            placeholder="Add tags separated by commas"
            value={tags}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTagsChange(e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326]"
          />
        </div>

        {/* Author */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <div className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg bg-gray-50">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">A</span>
            </div>
            <span className="text-sm text-gray-700">{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishSettings;
