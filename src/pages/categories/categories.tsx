import React, { useEffect, useState } from "react";
import PageHeader from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import CategoryGrid from "./components/CategoryGrid";
import AddCategoryModal from "./components/AddCategoryModal";
import EditCategoryModal from "./components/EditCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import {
  getCategories,
  addCategory,
  deleteCategory,
  editCategory,
} from "./api";
import { getIconById } from "./icons";
import Toast from "../../components/Toast";

const Categories: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    description: string;
    postCount: number;
    isActive: boolean;
    icon: React.ReactNode;
    iconBgColor: string;
  } | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<{
    id: number;
    name: string;
    description: string;
    postCount: number;
    isActive: boolean;
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
      isActive: boolean;
      icon: React.ReactNode;
      iconBgColor: string;
    }>
  >([]);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
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
          isActive: boolean;
          icon: React.ReactNode;
          iconBgColor: string;
        }> = (apiCategories as Array<any>).map((item) => {
          const palette = getIconById(Number(item?.icon) || 1);

          return {
            id: item?._id,
            name: String(item?.name ?? "Untitled"),
            description: String(item?.description ?? ""),
            postCount: Number(item?.blogCount) || 0,
            isActive: Boolean(item?.isActive),
            icon: palette.icon,
            iconBgColor: palette.bgColor,
          };
        });

        setCategories(mapped);
        setCategoryNumber(mapped.length);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  // keep mostPopularCategory in sync with highest postCount
  useEffect(() => {
    if (categories.length === 0) {
      setMostPopularCategory("");
      return;
    }
    const top = categories.reduce((max, cur) =>
      cur.postCount > max.postCount ? cur : max
    );
    setMostPopularCategory(top.name);
  }, [categories]);

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
    isActive: boolean,
    iconID: number
  ) => {
    try {
      // Call the API to add the category
      const response = await addCategory(name, description, isActive, iconID);

      if (response.success) {
        // Create new category object for local state
        const palette = getIconById(iconID);
        const newCategory = {
          id: Math.max(...categories.map((cat) => cat.id)) + 1, // Generate new ID
          name,
          description,
          postCount: 0, // New categories start with 0 posts
          isActive,
          icon: palette.icon,
          iconBgColor: palette.bgColor,
        };

        // Add new category to the list
        setCategories((prevCategories) => [...prevCategories, newCategory]);

        // Update category count
        setCategoryNumber((prev) => prev + 1);
        setIsToastVisible(true);
        setToastMessage("Category added successfully");
        setToastType("success");
      } else {
        console.error("Failed to add category:", response);
        setToastMessage("Failed to add category");
        setToastType("error");
        setIsToastVisible(true);
      }
    } catch (error: any) {
      setToastMessage(error.response.data.message);
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  const handleEditCategory = async (
    id: number,
    name: string,
    description: string,
    isActive: boolean
  ) => {
    try {
      const response = await editCategory(
        id.toString(),
        name,
        description,
        isActive
      );
      if (response.success) {
        setToastMessage("Category updated successfully");
        setToastType("success");
        setIsToastVisible(true);
        setCategories((prevCategories) =>
          prevCategories.map((cat) => {
            if (cat.id !== id) return cat;
            return {
              ...cat,
              name,
              description,
              isActive,
            };
          })
        );
      } else {
        setToastMessage("Failed to update category");
        setToastType("error");
        setIsToastVisible(true);
      }
    } catch (error: any) {
      setToastMessage(error.response.data.message);
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await deleteCategory(id);
      if (response.success) {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== id)
        );
        setCategoryNumber((prev) => prev - 1);
        setToastMessage("Category deleted successfully");
        setToastType("success");
        setIsToastVisible(true);
      } else {
        console.error("Failed to delete category:", response);
        setToastMessage("Failed to delete category");
        setToastType("error");
        setIsToastVisible(true);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
    <div className="space-y-6 pb-4">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={isToastVisible}
        duration={2500}
        onClose={() => {}}
      />
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
