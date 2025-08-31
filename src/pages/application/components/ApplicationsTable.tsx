import React from "react";
import Button from "../../../components/Button";

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

interface ApplicationsTableProps {
  applications: ApplicationFormData[];
  onViewApplication: (application: ApplicationFormData) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onViewApplication,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Applicant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              CV
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#f88326] flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {application.firstName.charAt(0)}
                      {application.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {application.firstName} {application.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {application.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {application.role.replace("-", " ")}
                </span>
              </td>
              <td className="px-6 py-4">
                <Button variant="outline" size="sm">
                  Download CV
                </Button>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {application.phoneNumber}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewApplication(application)}
                  >
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsTable;
