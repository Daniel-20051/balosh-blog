interface BlogTitleInputProps {
  title: string;
  onTitleChange: (title: string) => void;
}

const BlogTitleInput: React.FC<BlogTitleInputProps> = ({
  title,
  onTitleChange,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor="blog-title"
        className="block text-sm font-medium text-gray-700"
      >
        Blog Title
      </label>
      <input
        id="blog-title"
        type="text"
        placeholder="Enter your blog title..."
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onTitleChange(e.target.value)
        }
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] text-lg"
      />
    </div>
  );
};

export default BlogTitleInput;
