import React, { useState, useMemo } from "react";
import PageHeader from "./components/PageHeader";
import SummaryCards from "./components/SummaryCards";
import BlogTable from "./components/BlogTable";
import DeleteBlogModal from "./components/DeleteBlogModal";

const AllBlogs: React.FC = () => {
  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
    {
      id: 2,
      title: "Design Systems: Building Consistent User Experiences",
      thumbnail:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=40&h=40&fit=crop",
      category: "design",
      author: {
        name: "John Doe",
        avatar: null,
      },
      status: "published",
      views: 890,
      date: "Published on March 12, 2024",
    },
    {
      id: 3,
      title: "Startup Growth Strategies: From Idea to Market",
      thumbnail:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=40&h=40&fit=crop",
      category: "business",
      author: {
        name: "Emma Wilson",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      },
      status: "draft",
      views: 0,
      date: "Draft saved 1 day ago",
    },
    {
      id: 4,
      title: "React Performance Optimization Techniques",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=40&h=40&fit=crop",
      category: "technology",
      author: {
        name: "Mike Johnson",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      },
      status: "pending",
      views: 0,
      date: "Under review 5 days ago",
    },
    {
      id: 5,
      title: "Sustainable Living: Small Changes, Big Impact",
      thumbnail:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=40&h=40&fit=crop",
      category: "lifestyle",
      author: {
        name: "Alex Chen",
        avatar: null,
      },
      status: "published",
      views: 567,
      date: "Published on March 8, 2024",
    },
    {
      id: 6,
      title: "CSS Grid vs Flexbox: A Complete Guide",
      thumbnail:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      category: "tutorial",
      author: {
        name: "Maria Garcia",
        avatar: null,
      },
      status: "draft",
      views: 0,
      date: "Draft saved 3 days ago",
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

  // Calculate summary statistics
  const summaryCards = [
    {
      title: "Total Blogs",
      value: "247",
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
      value: "189",
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
      value: "42",
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

    console.log("Deleting blog:", { id });

    // Remove the blog from the list
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingBlog(null);
  };

  return (
    <div className="space-y-6">
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
        blogs={filteredBlogs}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
