import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { signUp } from "../api";
import Toast from "../../../components/Toast";
import { useUser } from "../../../contexts/UserContext";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useAuth();
  const { fetchUser } = useUser();
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        const response = await signUp(
          formData.email,
          formData.password,
          formData.firstName,
          formData.lastName,
          formData.username,
          formData.bio
        );
        console.log(response);
        if (response.success) {
          setLoading(false);

          localStorage.setItem("isAuthenticated", "true");

          await fetchUser();
          navigate("/admin/dashboard");
          setToastMessage("Account created successfully");
          setToastType("success");
          setIsToastVisible(true);
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        setToastMessage(
          String(error?.response?.data?.message) || "Failed to create account"
        );
        setToastType("error");
        setIsToastVisible(true);
      }
    }
  };

  const userIcon = (
    <svg
      className="h-5 w-5"
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
  );

  const emailIcon = (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  );

  const passwordIcon = (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
      <div className="text-center flex flex-col items-center mb-8">
        <img src="/assets/logo.png" alt="logo" className="w-50 h-25" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={(value) => handleInputChange("firstName", value)}
            icon={userIcon}
            error={errors.firstName}
            required
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={(value) => handleInputChange("lastName", value)}
            icon={userIcon}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Username"
          type="text"
          placeholder="Choose a unique username"
          value={formData.username}
          onChange={(value) => handleInputChange("username", value)}
          icon={userIcon}
          error={errors.username}
          required
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          icon={emailIcon}
          error={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          icon={passwordIcon}
          error={errors.password}
          required
        />

        <TextArea
          label="Bio (Optional)"
          placeholder="Tell us a bit about yourself and your blogging interests..."
          value={formData.bio}
          onChange={(value) => handleInputChange("bio", value)}
          rows={2}
          maxLength={500}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            "Create Account"
          )}
        </Button>

        {errors.general && (
          <p className="text-sm text-[#ef4444] text-center">{errors.general}</p>
        )}
      </form>

      <div className="text-center mt-6">
        <p className="text-[#515051]">
          Already have an account?{" "}
          <a
            href="/"
            className="text-[#f88326] hover:text-[#f88326]/80 font-medium transition-colors duration-200"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
