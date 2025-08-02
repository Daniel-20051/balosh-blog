import React from "react";

interface SeoSettingsProps {
  metaTitle: string;
  metaDescription: string;
  onMetaTitleChange: (title: string) => void;
  onMetaDescriptionChange: (description: string) => void;
}

const SeoSettings: React.FC<SeoSettingsProps> = ({
  metaTitle,
  metaDescription,
  onMetaTitleChange,
  onMetaDescriptionChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>

      <div className="space-y-4">
        {/* Meta Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Meta Title
          </label>
          <input
            type="text"
            placeholder="SEO optimized title"
            value={metaTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onMetaTitleChange(e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326]"
          />
          <p className="text-xs text-gray-500">60 characters recommended</p>
        </div>

        {/* Meta Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
          </label>
          <textarea
            placeholder="Brief description for search engines"
            value={metaDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onMetaDescriptionChange(e.target.value)
            }
            className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] resize-none"
          />
          <p className="text-xs text-gray-500">180 characters recommended</p>
        </div>
      </div>
    </div>
  );
};

export default SeoSettings;
