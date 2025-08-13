import React, { useState } from "react";
import { ICON_PALETTE } from "../icons";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    description: string,
    isActive: boolean,
    iconID: number
  ) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iconID, setIconID] = useState(1);

  const isFormValid =
    name.trim().length > 0 && description.trim().length > 0 && iconID > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }
    if (!description.trim()) {
      alert("Please enter a category description");
      return;
    }
    if (!iconID || iconID < 1) {
      alert("Please select an icon for your category");
      return;
    }

    setIsSubmitting(true);
    try {
      const isActive = status === "active";
      await onAdd(name.trim(), description.trim(), isActive, iconID);
      setName("");
      setDescription("");
      setStatus("active");
      setIconID(1);
      onClose();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setDescription("");
      setStatus("active");
      setIconID(1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Category
              </h3>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="text-gray-400 cursor-pointer hover:text-gray-600 disabled:opacity-50"
              >
                <svg
                  className="w-5 h-5"
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
          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label
                  htmlFor="category-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="category-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] disabled:opacity-50"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="category-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="category-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description"
                  rows={2}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f88326] focus:border-[#f88326] resize-none disabled:opacity-50"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={status === "active"}
                      onChange={() => setStatus("active")}
                      className="h-4 w-4 text-[#f88326] border-gray-300 focus:ring-[#f88326]"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={status === "inactive"}
                      onChange={() => setStatus("inactive")}
                      className="h-4 w-4 text-[#f88326] border-gray-300 focus:ring-[#f88326]"
                      disabled={isSubmitting}
                    />
                    <span className="text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>

              {/* Icon Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon <span className="text-red-500">*</span>
                </label>
                <div
                  role="radiogroup"
                  aria-label="Select icon"
                  className="grid grid-cols-6 gap-3"
                >
                  {ICON_PALETTE.map((icon) => {
                    const selected = iconID === icon.id;
                    return (
                      <button
                        key={icon.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        aria-label={`Icon ${icon.id}`}
                        onClick={() => setIconID(icon.id)}
                        className={`relative cursor-pointer flex items-center justify-center ${
                          icon.bgColor
                        } w-14 h-14 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                          selected
                            ? "border-[#f88326] ring-2 ring-[#f88326] ring-offset-2 shadow-sm"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full text-white ${icon.bgColor}`}
                        >
                          {icon.icon}
                        </div>
                        {selected && (
                          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#f88326] text-white">
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              className="w-3 h-3"
                            >
                              <path
                                d="M16.667 5.833l-8.334 8.334L3.333 9.167"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="px-4 py-2 bg-[#f88326] text-white rounded-lg hover:bg-[#e6761f] disabled:opacity-50 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Adding...</span>
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
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>Add Category</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
