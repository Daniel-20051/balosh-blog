import React, { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  postCount: number;
  status: "active" | "inactive";
  icon: React.ReactNode;
  iconBgColor: string;
}

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (
    id: number,
    name: string,
    description: string,
    icon: React.ReactNode,
    iconBgColor: string
  ) => void;
  category: Category | null;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  category,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available icons for selection
  const availableIcons = [
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      bgColor: "bg-blue-500",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
          />
        </svg>
      ),
      bgColor: "bg-green-500",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      bgColor: "bg-purple-500",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      bgColor: "bg-pink-500",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      bgColor: "bg-orange-500",
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      bgColor: "bg-red-500",
    },
  ];

  // Pre-fill form when category changes
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);

      // Find the index of the current icon
      const iconIndex = availableIcons.findIndex(
        (iconData) => iconData.bgColor === category.iconBgColor
      );
      setSelectedIcon(iconIndex >= 0 ? iconIndex : 0);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !category) return;

    setIsSubmitting(true);
    try {
      const selectedIconData = availableIcons[selectedIcon];
      await onEdit(
        category.id,
        name.trim(),
        description.trim(),
        selectedIconData.icon,
        selectedIconData.bgColor
      );
      onClose();
    } catch (error) {
      console.error("Error editing category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen || !category) return null;

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
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Category
                </h3>
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors disabled:opacity-50"
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-6 py-6">
              <div className="space-y-4">
                {/* Category Name */}
                <div>
                  <label
                    htmlFor="category-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="category-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="category-description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="category-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a brief description of this category"
                    rows={3}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Icon Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category Icon *
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {availableIcons.map((iconData, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedIcon(index)}
                        disabled={isSubmitting}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                          selectedIcon === index
                            ? "ring-2 ring-[#f88326] ring-offset-2"
                            : "hover:scale-105"
                        } ${
                          iconData.bgColor
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="w-6 h-6 text-white">
                          {iconData.icon}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Choose an icon to represent this category
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-700 cursor-pointer bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 cursor-pointer bg-[#f88326] text-white rounded-lg hover:bg-[#e6761f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
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
                      <span>Updating...</span>
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span>Update Category</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCategoryModal;
