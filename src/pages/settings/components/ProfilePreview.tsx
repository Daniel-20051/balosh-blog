import React from "react";

interface ProfilePreviewProps {
  imageUrl: string;
  displayName: string;
  username: string;
  bio: string;
}

const ProfilePreview: React.FC<ProfilePreviewProps> = ({
  imageUrl,
  displayName,
  username,
  bio,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Preview</h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Profile Picture */}
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 mx-auto sm:mx-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="flex flex-col text-center sm:text-left">
          {/* Display Name */}
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {displayName}
          </h3>

          {/* Username */}
          <p className="text-gray-600 mb-3">@{username}</p>

          {/* Bio */}
          <p className="text-gray-600 text-sm leading-relaxed max-w-md">
            {bio || "No bio provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
