import React, { useState, useEffect } from "react";
import BlogTitleInput from "./components/BlogTitleInput";
import FeaturedImageUpload from "./components/FeaturedImageUpload";
import ContentEditor from "./components/ContentEditor";
import ExcerptInput from "./components/ExcerptInput";
import PublishSettings from "./components/PublishSettings";
import SeoSettings from "./components/SeoSettings";
import QuickStats from "./components/QuickStats";

const NewBlog: React.FC = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");

  // Publish settings
  const [status, setStatus] = useState("draft");
  const [category, setCategory] = useState("technology");
  const [tags, setTags] = useState("");

  // SEO settings
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Stats
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [lastSaved, setLastSaved] = useState("Never");

  // Calculate word count and reading time
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
    setReadingTime(Math.ceil(words.length / 200)); // Average reading speed
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || content) {
        setLastSaved(new Date().toLocaleTimeString());
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [title, content]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFeaturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDraft = () => {
    // Save draft logic here
    console.log("Saving draft...");
  };

  const handlePublish = () => {
    // Publish logic here
    console.log("Publishing...");
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#000000]">
            Create New Blog Post
          </h1>
          <p className="text-gray-600 mt-2">
            Write and publish your next amazing blog post
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-3">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2 cursor-pointer bg-white border border-black text-black rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors"
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
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            <span>Save Draft</span>
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2 transition-colors"
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
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            <span>Publish</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Blog Title */}
          <BlogTitleInput title={title} onTitleChange={setTitle} />

          {/* Featured Image */}
          <FeaturedImageUpload
            imageUrl={featuredImage}
            onImageUpload={handleImageUpload}
          />

          {/* Content Editor */}
          <ContentEditor content={content} onContentChange={setContent} />

          {/* Excerpt */}
          <ExcerptInput excerpt={excerpt} onExcerptChange={setExcerpt} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <PublishSettings
            status={status}
            category={category}
            tags={tags}
            author="Admin User"
            onStatusChange={setStatus}
            onCategoryChange={setCategory}
            onTagsChange={setTags}
          />

          {/* SEO Settings */}
          <SeoSettings
            metaTitle={metaTitle}
            metaDescription={metaDescription}
            onMetaTitleChange={setMetaTitle}
            onMetaDescriptionChange={setMetaDescription}
          />

          {/* Quick Stats */}
          <QuickStats
            wordCount={wordCount}
            readingTime={readingTime}
            lastSaved={lastSaved}
          />
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
