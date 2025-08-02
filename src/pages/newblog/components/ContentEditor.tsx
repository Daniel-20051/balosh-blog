import React from "react";

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onContentChange,
}) => {
  const toolbarButtons = [
    { icon: "B", label: "Bold", action: "bold" },
    { icon: "I", label: "Italic", action: "italic" },
    { icon: "U", label: "Underline", action: "underline" },
    { icon: "•", label: "Unordered List", action: "unorderedList" },
    { icon: "1.", label: "Ordered List", action: "orderedList" },
    { icon: "🔗", label: "Link", action: "link" },
    { icon: "🖼️", label: "Image", action: "image" },
    { icon: "</>", label: "Code", action: "code" },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Content</label>

      {/* Toolbar */}
      <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
        {toolbarButtons.map((button) => (
          <button
            key={button.action}
            type="button"
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] transition-colors"
            title={button.label}
          >
            {button.icon}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Write your blog content here..."
        className="w-full h-64 p-4 border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] resize-none"
      />
    </div>
  );
};

export default ContentEditor;
