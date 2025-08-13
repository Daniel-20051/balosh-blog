import React, { useState } from "react";
import BlogTitleInput from "./components/BlogTitleInput";
import FeaturedImageUpload from "./components/FeaturedImageUpload";
import ContentEditor from "./components/ContentEditor";
import ExcerptInput from "./components/ExcerptInput";
import PublishSettings from "./components/PublishSettings";
import SeoSettings from "./components/SeoSettings";
import { newBlog } from "./api";
import Toast from "../../components/Toast";
import { useNavigate } from "react-router-dom";

const NewBlog: React.FC = () => {
  const navigate = useNavigate();
  // Form state
  const [title, setTitle] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [excerpt, setExcerpt] = useState("");
  // Content HTML (from Quill)
  const [contentHtml, setContentHtml] = useState("");

  // Publish settings
  const [status, setStatus] = useState("draft");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");

  // SEO settings
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  //Toast Message
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isToastVisible, setIsToastVisible] = useState(false);

  //loading state
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleImageUpload = (file: File) => {
    setFeaturedImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFeaturedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      if (status === "published") {
        setToastMessage("Please Change Status to Draft.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!title) {
        setToastMessage("Please enter a title before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!contentHtml) {
        setToastMessage("Please enter a content before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }

      if (!featuredImageFile) {
        setToastMessage("Please upload a featured image before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!category) {
        setToastMessage("Please select a category before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!tags) {
        setToastMessage("Please enter tags before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!metaTitle) {
        setToastMessage("Please enter a meta title before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!metaDescription) {
        setToastMessage("Please enter a meta description before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }

      const response: any = await newBlog(
        featuredImageFile,
        title,
        contentHtml,
        excerpt,
        category,
        status,
        tags,
        metaTitle,
        metaDescription
      );
      console.log(response.data);
      if (response.data.success === true) {
        console.log("Blog saved successfully");
        setToastMessage("Blog saved successfully");
        setToastType("success");
        setIsToastVisible(true);
        setTitle("");
        setFeaturedImageFile(null);
        setContentHtml("");
        setExcerpt("");
        setCategory("");
        setTags("");
        setMetaTitle("");
        navigate("/admin/all-blogs");
      } else {
        setToastMessage("Error saving blog");
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error saving blog");
      setToastType("error");
      setIsToastVisible(true);
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      if (status === "draft") {
        setToastMessage("Please Change Status to Published.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!title) {
        setToastMessage("Please enter a title before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }
      if (!contentHtml) {
        setToastMessage("Please enter a content before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }

      if (!featuredImageFile) {
        setToastMessage("Please upload a featured image before saving.");
        setToastType("error");
        setIsToastVisible(true);
        return;
      }

      const response: any = await newBlog(
        featuredImageFile,
        title,
        contentHtml,
        excerpt,
        category,
        status,
        tags,
        metaTitle,
        metaDescription
      );
      console.log(response.data);
      if (response.data.success === true) {
        setToastMessage("Blog Published successfully");
        setToastType("success");
        setIsToastVisible(true);
        setTitle("");
        setFeaturedImageFile(null);
        setContentHtml("");
        setExcerpt("");
        setCategory("");
        setTags("");
        setMetaTitle("");
        navigate("/admin/all-blogs");
      } else {
        setToastMessage("Error Publishing blog");
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error Publishing blog");
      setToastType("error");
      setIsToastVisible(true);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={isToastVisible}
        duration={2500}
        onClose={() => setIsToastVisible(false)}
      />
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
            disabled={isSavingDraft}
            className={`px-4 py-2  bg-white border border-black text-black rounded-lg hover:bg-gray-50 flex items-center space-x-2 transition-colors ${
              isSavingDraft ? "cursor-not-allowed" : "cursor-pointer"
            }`}
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
            <span>{isSavingDraft ? "Saving..." : "Save Draft"}</span>
          </button>
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className={`px-4 py-2  bg-black text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2 transition-colors ${
              isPublishing ? "cursor-not-allowed" : "cursor-pointer"
            }`}
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
            <span>{isPublishing ? "Publishing..." : "Publish"}</span>
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
          <ContentEditor value={contentHtml} onChange={setContentHtml} />

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
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
