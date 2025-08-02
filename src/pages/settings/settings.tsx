import React, { useState } from "react";
import PageHeader from "./components/PageHeader";
import ProfilePicture from "./components/ProfilePicture";
import PersonalInformation from "./components/PersonalInformation";
import ProfilePreview from "./components/ProfilePreview";

const Settings: React.FC = () => {
  // State for profile data
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=96&h=96&fit=crop&crop=face"
  );
  const [firstName, setFirstName] = useState("Admin");
  const [lastName, setLastName] = useState("User");
  const [displayName, setDisplayName] = useState("Admin");
  const [username, setUsername] = useState("@admin_user");
  const [bio, setBio] = useState(
    "Passionate blogger and content creator sharing insights about web design, technology, and user experience."
  );

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
    setProfileImage(
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    );
  };

  const handleSaveChanges = () => {
    console.log("Saving changes...", {
      profileImage,
      firstName,
      lastName,
      displayName,
      username,
      bio,
    });
    // Here you would typically make an API call to save the changes
    alert("Changes saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-4 sm:space-y-6">
        {/* Page Header */}
        <PageHeader onSaveChanges={handleSaveChanges} />

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
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onDisplayNameChange={setDisplayName}
          onUsernameChange={setUsername}
          onBioChange={setBio}
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
