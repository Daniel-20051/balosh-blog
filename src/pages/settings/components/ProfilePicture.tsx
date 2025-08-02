interface ProfilePictureProps {
  currentImageUrl: string;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  currentImageUrl,
  onImageUpload,
  onImageRemove,
}) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Profile Picture</h2>

      <div className="flex items-start space-x-6">
        {/* Current Profile Picture */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            <img
              src={currentImageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#f88326] rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex-1">
          <p className="text-gray-600 mb-4">
            Upload a new profile picture. Recommended size: 400x400px
          </p>

          <div className="flex space-x-3">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="bg-white border border-gray-300 text-black px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span>Upload New</span>
              </div>
            </label>

            <button
              onClick={onImageRemove}
              className="bg-white cursor-pointer border border-red-600 text-red-600 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-50 transition-colors"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
