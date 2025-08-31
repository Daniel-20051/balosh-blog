import { useState, useEffect } from "react";
import {
  PageHeader,
  FilterBar,
  ApplicationsTable,
  ViewApplicationModal,
} from "./components";

interface ApplicationFormData {
  id: string;
  cv: File | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  submittedAt: Date;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

const Application = () => {
  const [applications, setApplications] = useState<ApplicationFormData[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationFormData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Sample data
  useEffect(() => {
    const sampleApplications: ApplicationFormData[] = [
      {
        id: "1",
        cv: new File(["sample"], "john_resume.pdf", {
          type: "application/pdf",
        }),
        firstName: "John",
        lastName: "Smith",
        phoneNumber: "+1234567890",
        role: "frontend-developer",
        submittedAt: new Date("2024-01-15"),
        status: "pending",
      },
      {
        id: "2",
        cv: new File(["sample"], "sarah_resume.pdf", {
          type: "application/pdf",
        }),
        firstName: "Sarah",
        lastName: "Johnson",
        phoneNumber: "+1987654321",
        role: "backend-developer",
        submittedAt: new Date("2024-01-14"),
        status: "reviewed",
      },
    ];
    setApplications(sampleApplications);
  }, []);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === "all" || app.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  const handleViewApplication = (application: ApplicationFormData) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  return (
    <div className="py-2 px-3">
      <PageHeader />
      <div className="max-w-7xl mx-auto">
        <FilterBar
          searchTerm={searchTerm}
          selectedRole={selectedRole}
          onSearchChange={handleSearchChange}
          onRoleChange={handleRoleChange}
        />
        <ApplicationsTable
          applications={filteredApplications}
          onViewApplication={handleViewApplication}
        />
      </div>

      <ViewApplicationModal
        application={selectedApplication}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Application;
