import React, { useEffect, useMemo, useState } from "react";
import BlogTitleInput from "../../newblog/components/BlogTitleInput";
import FeaturedImageUpload from "../../newblog/components/FeaturedImageUpload";
import ContentEditor from "../../newblog/components/ContentEditor";
import ExcerptInput from "../../newblog/components/ExcerptInput";
import PublishSettings from "../../newblog/components/PublishSettings";
import SeoSettings from "../../newblog/components/SeoSettings";

type Blog = {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  author: {
    name: string;
    avatar: string | null;
  };
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  status: string;
  views: number;
  date: string;
};

type EditBlogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  blog: Blog | null;
  onSave: (updated: {
    id: number;
    title: string;
    featuredImage: string | null;
    featuredImageFile: File | null;
    contentHtml: string;
    excerpt: string;
    status: string;
    category: string;
    tags: string;
    metaTitle: string;
    metaDescription: string;
  }) => Promise<{ success: boolean }> | void;
  isLoading: boolean;
};

const EditBlogModal: React.FC<EditBlogModalProps> = ({
  isOpen,
  onClose,
  blog,
  onSave,
  isLoading,
}) => {
  const [isSaving, setIsSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [contentHtml, setContentHtml] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState("draft");
  const [category, setCategory] = useState("technology");
  const [tags, setTags] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => {
    if (!blog) return;
    setTitle(blog.title || "");
    setFeaturedImage(blog.thumbnail || null);
    setFeaturedImageFile(null);
    setStatus(blog.status.toLowerCase());
    setCategory(blog.category.toLowerCase());
    setContentHtml(blog.content);
    setExcerpt(blog.excerpt);
    setMetaTitle(blog.metaTitle);
    setMetaDescription(blog.metaDescription);
  }, [blog]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFeaturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setFeaturedImageFile(file);
  };

  const canSave = useMemo(() => {
    return title.trim().length > 0;
  }, [title]);

  const handleSave = async () => {
    if (!blog || !canSave) return;
    setIsSaving(true);
    try {
      const result = await onSave({
        id: blog.id,
        title,
        featuredImage,
        featuredImageFile,
        contentHtml,
        excerpt,
        status,
        category,
        tags,
        metaTitle,
        metaDescription,
      });

      // Only close modal if save was successful
      if (result && result.success) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to save blog", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !blog) return null;

  return (
    <>
      <style>
        {`
          @keyframes modalSlideIn {
            from { opacity: 0; transform: translateY(-20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
      <div className="fixed inset-0 z-50">
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm"
          onClick={() => !isSaving && onClose()}
        />
        <div className="flex min-h-full items-start justify-center p-4">
          <div
            className="relative w-full max-w-5xl transform overflow-hidden rounded-lg bg-white shadow-xl max-h-[95vh] flex flex-col"
            style={{ animation: "modalSlideIn 0.25s ease-out forwards" }}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Blog Post
                </h3>
                <p className="text-sm text-gray-600">
                  Update your post details and settings
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isSaving}
                className="text-gray-400 cursor-pointer hover:text-gray-600 disabled:opacity-50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main */}
                <div className="lg:col-span-2 space-y-6">
                  <BlogTitleInput title={title} onTitleChange={setTitle} />

                  <FeaturedImageUpload
                    imageUrl={featuredImage}
                    onImageUpload={handleImageUpload}
                  />

                  <ContentEditor
                    value={contentHtml}
                    onChange={setContentHtml}
                  />

                  <ExcerptInput
                    excerpt={excerpt}
                    onExcerptChange={setExcerpt}
                  />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <PublishSettings
                    status={status}
                    category={category}
                    tags={tags}
                    author={blog.author.name}
                    onStatusChange={setStatus}
                    onCategoryChange={setCategory}
                    onTagsChange={setTags}
                    isCategoryEditable={false}
                  />

                  <SeoSettings
                    metaTitle={metaTitle}
                    metaDescription={metaDescription}
                    onMetaTitleChange={setMetaTitle}
                    onMetaDescriptionChange={setMetaDescription}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 disabled:cursor-not-allowed cursor-pointer bg-white border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="px-4 py-2 disabled:cursor-not-allowed cursor-pointer bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving && (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0A12 12 0 000 12h4z"
                    ></path>
                  </svg>
                )}
                <span>Save changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlogModal;
