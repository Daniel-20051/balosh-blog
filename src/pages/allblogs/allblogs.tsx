import React, { useState, useMemo, useEffect } from "react";
import PageHeader from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import BlogTable from "./components/BlogTable";
import EditBlogModal from "./components/EditBlogModal";
import DeleteBlogModal from "./components/DeleteBlogModal";
import { getBlogs, getBlogStats, editBlog, deleteBlog } from "./api";
import Pagination from "../../components/Pagination";
import Toast from "../../components/Toast";

const AllBlogs: React.FC = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  //loader state
  const [isEditLoading, setIsEditLoading] = useState(false);

  //toast state
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [toastVisible, setToastVisible] = useState(false);
  //Blog stats state
  const [blogStats, setBlogStats] = useState<{
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
  }>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
  });

  //Loader state
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [isBlogsLoading, setIsBlogsLoading] = useState(false);

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState<{
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
  } | null>(null);

  const handleBlogStats = async () => {
    try {
      setIsStatsLoading(true);
      const response = await getBlogStats();
      setBlogStats(response.data.stats);
    } catch (error) {
      console.log(error);
    } finally {
      setIsStatsLoading(false);
    }
  };
  const handleBlogs = async () => {
    try {
      setIsBlogsLoading(true);
      const response = await getBlogs();
      // Normalize potential shapes: { blogs: [...] }, { data: { blogs: [...] } }, or [...]
      const payload: any = Array.isArray(response)
        ? { blogs: response }
        : Array.isArray(response?.blogs)
        ? response
        : Array.isArray(response?.data?.blogs)
        ? response.data
        : { blogs: [] };

      const formatDateLabel = (blog: any): string => {
        const iso = blog?.publishDate || blog?.createdAt;
        if (!iso) return "";
        const date = new Date(iso);
        return `Published on ${date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`;
      };

      const mappedBlogs = (payload.blogs as any[]).map((b: any) => ({
        id: b._id,
        title: b?.title ?? "Untitled",
        thumbnail:
          b?.featuredImage ||
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop",
        category: b?.category?._id,
        categoryName: b?.category?.name,
        author: {
          name: b?.author?.firstName || b?.author?.username || "Unknown",
          avatar: b?.author?.avatar || null,
        },
        content: b?.content || "",
        excerpt: b?.excerpt || "",
        metaTitle: b?.metaTitle || "",
        metaDescription: b?.metaDescription || "",
        status: (b?.status || "draft").toLowerCase(),
        views: Number(b?.views ?? 0),
        date: formatDateLabel(b),
      }));

      setBlogs(mappedBlogs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBlogsLoading(false);
    }
  };

  useEffect(() => {
    handleBlogStats();
    handleBlogs();
  }, []);

  // Mock data - converted to state
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop",
      category: "technology",
      categoryName: "Technology",
      author: {
        name: "Sarah Johnson",
        avatar: null,
      },
      content: "This is a test content",
      excerpt: "This is a test excerpt",
      metaTitle: "This is a test meta title",
      metaDescription: "This is a test meta description",
      status: "published",
      views: 1200,
      date: "Published on March 15, 2024",
    },
  ]);

  // Filter blogs based on selected filters
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const categoryMatch =
        selectedCategory === "all" || blog.category === selectedCategory;
      const statusMatch =
        selectedStatus === "all" || blog.status === selectedStatus;
      return categoryMatch && statusMatch;
    });
  }, [blogs, selectedCategory, selectedStatus]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredBlogs.length / pageSize));
  }, [filteredBlogs.length, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedStatus]);

  // Ensure currentPage remains within bounds when data changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Slice filtered results for the current page
  const pagedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredBlogs.slice(startIndex, startIndex + pageSize);
  }, [filteredBlogs, currentPage, pageSize]);

  // Calculate summary statistics
  const summaryCards = [
    {
      title: "Total Blogs",
      value: String(blogStats.totalBlogs),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Published",
      value: String(blogStats.publishedBlogs),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Drafts",
      value: String(blogStats.draftBlogs),
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const [editingBlog, setEditingBlog] = useState<{
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
  } | null>(null);

  const handleEdit = (id: number) => {
    const blog = blogs.find((b) => b.id === id) || null;
    setEditingBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (blog) {
      setDeletingBlog(blog);
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    const response: any = await deleteBlog(id.toString());
    console.log(response);
    if (response.success) {
      handleBlogStats();
      setToastMessage("Blog deleted successfully");
      setToastType("success");
      setToastVisible(true);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } else {
      setToastMessage("Failed to delete blog");
      setToastType("error");
      setToastVisible(true);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingBlog(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingBlog(null);
  };

  const handleSaveEditedBlog = async (updated: {
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
  }) => {
    setIsEditLoading(true);
    const response: any = await editBlog(
      updated.id.toString(),
      updated.featuredImageFile ?? null,
      updated.title,
      updated.contentHtml,
      updated.excerpt,
      updated.category,
      updated.status,
      updated.tags,
      updated.metaTitle,
      updated.metaDescription
    );

    const isSuccess = response.data.success;

    if (isSuccess) {
      handleBlogStats();
      setToastMessage("Blog updated successfully");
      setToastType("success");
      setToastVisible(true);
      // Update local state for UI feedback
      setBlogs((prev) =>
        prev.map((b) =>
          b.id === updated.id
            ? {
                ...b,
                title: updated.title,
                thumbnail: updated.featuredImage || b.thumbnail,
                status: updated.status,
                category: updated.category,
                content: updated.contentHtml,
                excerpt: updated.excerpt,
                metaTitle: updated.metaTitle,
                metaDescription: updated.metaDescription,
              }
            : b
        )
      );
    } else {
      setToastMessage("Failed to update blog");
      setToastType("error");
      setToastVisible(true);
    }

    setIsEditLoading(false);

    // Return success status so modal can decide whether to close
    return { success: isSuccess };
  };

  return (
    <div className="space-y-6 pb-4">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={toastVisible}
        onClose={() => {
          setToastVisible(false);
        }}
      />
      {/* Page Header */}
      <PageHeader
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
      />

      {/* Summary Cards */}
      <SummaryCards cards={summaryCards} isLoading={isStatsLoading} />

      {/* Blog Table */}
      <BlogTable
        blogs={pagedBlogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isBlogsLoading}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredBlogs.length}
        onPageChange={setCurrentPage}
      />

      {/* Delete Blog Modal */}
      <DeleteBlogModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteBlog}
        blog={deletingBlog}
      />

      {/* Edit Blog Modal */}
      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        blog={editingBlog}
        onSave={handleSaveEditedBlog}
        isLoading={isEditLoading}
      />
    </div>
  );
};

export default AllBlogs;
