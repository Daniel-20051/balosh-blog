import React from "react";

interface ExcerptInputProps {
  excerpt: string;
  onExcerptChange: (excerpt: string) => void;
}

const ExcerptInput: React.FC<ExcerptInputProps> = ({
  excerpt,
  onExcerptChange,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="excerpt"
        className="block text-sm font-medium text-gray-700"
      >
        Excerpt
      </label>
      <textarea
        id="excerpt"
        value={excerpt}
        onChange={(e) => onExcerptChange(e.target.value)}
        placeholder="Write a brief summary of your blog post..."
        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] resize-none"
      />
      <p className="text-xs text-gray-500">
        This will be shown in blog previews and search results
      </p>
    </div>
  );
};

export default ExcerptInput;
