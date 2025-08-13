import React, { useEffect, useState } from "react";
import PageHeader from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import CategoryGrid from "./components/CategoryGrid";
import AddCategoryModal from "./components/AddCategoryModal";
import EditCategoryModal from "./components/EditCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import { getCategories } from "./api";
import { getIconById } from "./icons";

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
  const [categoryNumber, setCategoryNumber] = useState(0);
  const [mostPopularCategory, setMostPopularCategory] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
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
  >([]);

  // icon mapping moved to shared palette with numeric ids

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const response = await getCategories();
        const apiCategories =
          response?.data?.categories ?? response?.categories ?? [];

        const mapped: Array<{
          id: number;
          name: string;
          description: string;
          postCount: number;
          status: "active" | "inactive";
          icon: React.ReactNode;
          iconBgColor: string;
        }> = (apiCategories as Array<any>).map((item, index) => {
          const palette = getIconById(Number(item?.icon) || 1);

          return {
            id: index + 1,
            name: String(item?.name ?? "Untitled"),
            description: String(item?.description ?? ""),
            postCount: Number(item?.postCount) || 0,
            status: (item?.isActive ? "active" : "inactive") as
              | "active"
              | "inactive",
            icon: palette.icon,
            iconBgColor: palette.bgColor,
          };
        });

        setCategories(mapped);
        setCategoryNumber(mapped.length);
        setMostPopularCategory(mapped[0].name);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Mock data for summary cards
  const summaryCards = [
    {
      title: "Total Categories",
      value: categoryNumber.toString(),
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
      value: mostPopularCategory,
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
    status: "active" | "inactive"
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Adding new category:", { name, description, status });

    // Create new category object
    // Keep a default visual since icons are now removed from the form
    const palette = getIconById(1);
    const newCategory = {
      id: Math.max(...categories.map((cat) => cat.id)) + 1, // Generate new ID
      name,
      description,
      postCount: 0, // New categories start with 0 posts
      status,
      icon: palette.icon,
      iconBgColor: palette.bgColor,
    };

    // Add new category to the list
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const handleEditCategory = async (
    id: number,
    name: string,
    description: string,
    status: "active" | "inactive"
  ) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Editing category:", { id, name, description, status });

    // Update the category in the list
    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== id) return cat;
        return {
          ...cat,
          name,
          description,
          status,
        };
      })
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
      <SummaryCards cards={summaryCards} isLoading={isLoading} />

      {/* Category Grid */}
      <CategoryGrid
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
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
