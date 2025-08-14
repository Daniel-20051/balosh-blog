import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "./api";
import PageHeader from "./components/PageHeader";
import ProfilePicture from "./components/ProfilePicture";
import PersonalInformation from "./components/PersonalInformation";
import ProfilePreview from "./components/ProfilePreview";
import Toast from "../../components/Toast";
import { BASE_URL } from "../../contexts/AuthContext";

const Settings: React.FC = () => {
  const { user, loading, error, refreshUserSilently } = useUser();

  // State for profile data
  const [profileImage, setProfileImage] = useState("");
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isProfilePhotoRemoved, setIsProfilePhotoRemoved] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  // Helper to resolve full URL for profile photo
  const resolveProfilePhotoUrl = (photo?: string | null): string => {
    if (!photo) return "";
    if (/^https?:\/\//i.test(photo)) return photo;
    const apiRoot = BASE_URL.replace(/\/api\/.*/i, "");
    if (photo.startsWith("/")) return `${apiRoot}${photo}`;
    return `${apiRoot}/${photo}`;
  };

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileImage(resolveProfilePhotoUrl(user.profilePhoto));
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setDisplayName(`${user.firstName} ${user.lastName}`);
      setUsername(user.username);
      setBio(user.bio || "");
      setEmail(user.email);
      setIsProfilePhotoRemoved(false);
    }
  }, [user]);

  const handleImageUpload = (file: File) => {
    setProfileFile(file);
    setIsProfilePhotoRemoved(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setProfileImage("");
    setProfileFile(null);
    setIsProfilePhotoRemoved(true);
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    // Basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      showToast(
        "Please fill in all required fields (First Name, Last Name, and Email)",
        "error"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setIsSaving(true);
    try {
      const payload: any = {
        firstName,
        lastName,
        displayName,
        username,
        bio,
        email,
      };
      if (isProfilePhotoRemoved) {
        payload.profilePhoto = null;
      } else if (profileFile instanceof File) {
        payload.profilePhoto = profileFile;
      }

      await updateUser(payload);
      setIsRefreshing(true);
      await refreshUserSilently();
      setIsRefreshing(false);
      showToast("Changes saved successfully!", "success");
    } catch (error) {
      // Extract a meaningful error message if available
      let message = "Failed to save changes. Please try again.";
      const anyError = error as any;
      if (anyError?.response?.data?.message) {
        message = anyError.response.data.message as string;
      } else if (anyError?.message) {
        message = anyError.message as string;
      }
      console.error("Failed to save changes:", error);
      showToast(message, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const SettingsSkeleton: React.FC = () => {
    return (
      <div className="max-w-4xl pb-4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div className="space-y-2 animate-pulse">
              <div className="h-7 sm:h-8 w-40 sm:w-48 bg-gray-200 rounded" />
              <div className="h-4 w-56 sm:w-72 bg-gray-200 rounded" />
            </div>
            <div className="animate-pulse">
              <div className="h-10 w-36 bg-gray-200 rounded-lg" />
            </div>
          </div>

          {/* Profile Picture Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="flex items-center space-x-6">
              <div className="h-24 w-24 rounded-full bg-gray-200" />
              <div className="space-y-2 flex-1">
                <div className="h-10 w-40 bg-gray-200 rounded" />
                <div className="h-10 w-28 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2 animate-pulse">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Profile Preview Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-3 animate-pulse">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-64 bg-gray-200 rounded" />
            <div className="h-8 w-48 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">
            {error || "Failed to load user data"}
          </div>
        </div>
      </div>
    );
  }

  if (isRefreshing) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="max-w-4xl pb-4 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={toastVisible}
          onClose={() => setToastVisible(false)}
          duration={4000}
        />
        {/* Page Header */}
        <PageHeader onSaveChanges={handleSaveChanges} isSaving={isSaving} />

        {/* Profile Picture Section */}
        <ProfilePicture
          currentImageUrl={profileImage}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
        />

        {/* Personal Information Section */}
        <PersonalInformation
          firstName={firstName}
          lastName={lastName}
          displayName={displayName}
          username={username}
          bio={bio}
          email={email}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onDisplayNameChange={setDisplayName}
          onUsernameChange={setUsername}
          onBioChange={setBio}
          onEmailChange={setEmail}
        />

        {/* Profile Preview Section */}
        <ProfilePreview
          imageUrl={profileImage}
          displayName={displayName}
          username={username}
          bio={bio}
        />
      </div>
    </div>
  );
};

export default Settings;
