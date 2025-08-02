import React, { useState } from "react";
import PageHeader from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import CategoryGrid from "./components/CategoryGrid";
import AddCategoryModal from "./components/AddCategoryModal";
import EditCategoryModal from "./components/EditCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";

const Categories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    description: string;
    postCount: number;
    status: "active" | "inactive";
    icon: React.ReactNode;
    iconBgColor: string;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<{
    id: number;
    name: string;
    description: string;
    postCount: number;
    status: "active" | "inactive";
    icon: React.ReactNode;
    iconBgColor: string;
  } | null>(null);
  const [categories, setCategories] = useState<
    Array<{
      id: number;
      name: string;
      description: string;
      postCount: number;
      status: "active" | "inactive";
      icon: React.ReactNode;
      iconBgColor: string;
    }>
  >([
    {
      id: 1,
      name: "Technology",
      description: "Latest tech trends, gadgets, and innovations",
      postCount: 42,
      status: "active" as const,
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
      iconBgColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "Design",
      description: "UI/UX design principles and creative inspiration",
      postCount: 28,
      status: "active" as const,
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
      iconBgColor: "bg-green-500",
    },
    {
      id: 3,
      name: "Development",
      description: "Programming tutorials and coding best practices",
      postCount: 35,
      status: "active" as const,
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
      iconBgColor: "bg-purple-500",
    },
    {
      id: 4,
      name: "Innovation",
      description: "Creative ideas and innovative solutions",
      postCount: 19,
      status: "active" as const,
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
      iconBgColor: "bg-pink-500",
    },
    {
      id: 5,
      name: "Business",
      description: "Entrepreneurship and business strategies",
      postCount: 23,
      status: "active" as const,
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
      iconBgColor: "bg-orange-500",
    },
    {
      id: 6,
      name: "Lifestyle",
      description: "Personal development and life tips",
      postCount: 15,
      status: "inactive" as const,
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
      iconBgColor: "bg-red-500",
    },
  ]);

  // Mock data for summary cards
  const summaryCards = [
    {
      title: "Total Categories",
      value: "12",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Most Popular",
      value: "Technology",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Uncategorized Posts",
      value: "8",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const handleEdit = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setEditingCategory(category);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setDeletingCategory(category);
      setIsDeleteModalOpen(true);
    }
  };

  const handleAddCategory = async (
    name: string,
    description: string,
    icon: React.ReactNode,
    iconBgColor: string
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Adding new category:", { name, description, iconBgColor });

    // Create new category object
    const newCategory = {
      id: Math.max(...categories.map((cat) => cat.id)) + 1, // Generate new ID
      name,
      description,
      postCount: 0, // New categories start with 0 posts
      status: "active" as const,
      icon,
      iconBgColor,
    };

    // Add new category to the list
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const handleEditCategory = async (
    id: number,
    name: string,
    description: string,
    icon: React.ReactNode,
    iconBgColor: string
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Editing category:", { id, name, description, iconBgColor });

    // Update the category in the list
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              name,
              description,
              icon,
              iconBgColor,
            }
          : cat
      )
    );
  };

  const handleDeleteCategory = async (id: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Deleting category:", { id });

    // Remove the category from the list
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== id)
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingCategory(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader onAddCategory={openModal} />

      {/* Summary Cards */}
      <SummaryCards cards={summaryCards} />

      {/* Category Grid */}
      <CategoryGrid
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddCategory}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEdit={handleEditCategory}
        category={editingCategory}
      />

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteCategory}
        category={deletingCategory}
      />
    </div>
  );
};

export default Categories;
