import React, { useState } from "react";

interface Blog {
  id: number;
  title: string;
  thumbnail: string;
  category: string;
  author: {
    name: string;
    avatar: string | null;
  };
  status: string;
  views: number;
  date: string;
}

interface DeleteBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  blog: Blog | null;
}

const DeleteBlogModal: React.FC<DeleteBlogModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  blog,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: "bg-blue-100 text-blue-800",
      design: "bg-purple-100 text-purple-800",
      business: "bg-green-100 text-green-800",
      lifestyle: "bg-pink-100 text-pink-800",
      tutorial: "bg-yellow-100 text-yellow-800",
    };
    return (
      colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      published: "bg-green-100 text-green-800",
      draft: "bg-orange-100 text-orange-800",
      pending: "bg-blue-100 text-blue-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const handleDelete = async () => {
    if (!blog) return;

    setIsDeleting(true);
    try {
      await onDelete(blog.id);
      onClose();
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  if (!isOpen || !blog) return null;

  return (
    <>
      <style>
        {`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes modalSlideOut {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
          }
        `}
      </style>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-primary/10 backdrop-blur-sm transition-all duration-300 ease-in-out"
          onClick={handleClose}
        />

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-out"
            style={{
              animation: "modalSlideIn 0.3s ease-out forwards",
            }}
          >
            {/* Header */}
            <div className="bg-red-50 px-6 py-4 border-b border-red-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-red-900">
                    Delete Blog Post
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isDeleting}
                  className="text-red-400 cursor-pointer hover:text-red-600 transition-colors disabled:opacity-50"
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
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="space-y-4">
                {/* Warning Message */}
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    Are you sure you want to delete this blog post? This action cannot be undone.
                  </p>
                </div>

                {/* Blog Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img
                        className="h-16 w-16 rounded-lg object-cover"
                        src={blog.thumbnail}
                        alt={blog.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-2">
                        {blog.title}
                      </h4>
                      
                      {/* Author */}
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex-shrink-0 h-6 w-6">
                          {blog.author.avatar ? (
                            <img
                              className="h-6 w-6 rounded-full object-cover"
                              src={blog.author.avatar}
                              alt={blog.author.name}
                            />
                          ) : (
                            <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-600">
                                {blog.author.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-600">{blog.author.name}</span>
                      </div>

                      {/* Category and Status */}
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                            blog.category
                          )}`}
                        >
                          {blog.category}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            blog.status
                          )}`}
                        >
                          {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                        </span>
                      </div>

                      {/* Views and Date */}
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{blog.views} views</span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning about published posts */}
                {blog.status === "published" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <svg
                        className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-yellow-800">
                          This is a published post
                        </p>
                        <p className="text-xs text-yellow-700 mt-1">
                          Deleting this post will remove it from your website and it will no longer be accessible to readers.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Warning about views */}
                {blog.views > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <svg
                        className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-800">
                          Post has {blog.views} view{blog.views !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          This post has been viewed by readers. Deleting it will remove all engagement data.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 cursor-pointer bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span>Delete Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBlogModal; 