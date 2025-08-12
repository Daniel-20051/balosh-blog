import React, { useState, useMemo, useEffect } from "react";
import PageHeader from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import BlogTable from "./components/BlogTable";
import DeleteBlogModal from "./components/DeleteBlogModal";
import { getBlogs, getBlogStats } from "./api";
import Pagination from "../../components/Pagination";

const AllBlogs: React.FC = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

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

      const mappedBlogs = (payload.blogs as any[]).map(
        (b: any, idx: number) => ({
          id: idx + 1, // fallback numeric id for UI purposes
          title: b?.title ?? "Untitled",
          thumbnail:
            b?.featuredImage ||
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=40&h=40&fit=crop",
          category: b?.category?.name || b?.category || "uncategorized",
          author: {
            name: b?.author?.firstName || b?.author?.username || "Unknown",
            avatar: b?.author?.avatar || null,
          },
          status: (b?.status || "draft").toLowerCase(),
          views: Number(b?.views ?? 0),
          date: formatDateLabel(b),
        })
      );

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
      author: {
        name: "Sarah Johnson",
        avatar: null,
      },
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

  const handleEdit = (id: number) => {
    console.log("Edit blog:", id);
    // Navigate to edit page or open edit modal
  };

  const handleDelete = (id: number) => {
    const blog = blogs.find((blog) => blog.id === id);
    if (blog) {
      setDeletingBlog(blog);
      setIsDeleteModalOpen(true);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Remove the blog from the list
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingBlog(null);
  };

  if (isStatsLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)] px-4 py-3">
        <div className="animate-spin rounded-full w-12 h-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      {/* Page Header */}
      <PageHeader
        selectedCategory={selectedCategory}
        selectedStatus={selectedStatus}
        onCategoryChange={setSelectedCategory}
        onStatusChange={setSelectedStatus}
      />

      {/* Summary Cards */}
      <SummaryCards cards={summaryCards} />

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
    </div>
  );
};

export default AllBlogs;
