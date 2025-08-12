import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { updateUser } from "../../api";
import PageHeader from "./components/PageHeader";
import ProfilePicture from "./components/ProfilePicture";
import PersonalInformation from "./components/PersonalInformation";
import ProfilePreview from "./components/ProfilePreview";

const Settings: React.FC = () => {
  const { user, loading, error, refreshUser } = useUser();

  // State for profile data
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data when user data is loaded
  useEffect(() => {
    if (user) {
      setProfileImage(user.profilePhoto || "");
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setDisplayName(`${user.firstName} ${user.lastName}`);
      setUsername(user.username);
      setBio(user.bio || "");
      setEmail(user.email);
    }
  }, [user]);

  const handleImageUpload = (file: File) => {
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
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    // Basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert(
        "Please fill in all required fields (First Name, Last Name, and Email)"
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSaving(true);
    try {
      await updateUser({
        firstName,
        lastName,
        displayName,
        username,
        bio,
        email,
      });

      // Refresh user data to get updated information
      await refreshUser();
      alert("Changes saved successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
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

  return (
    <div className="max-w-4xl pb-4 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
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
