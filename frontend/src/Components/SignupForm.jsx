import React, { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";

const initialFormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.firstName)
      tempErrors.firstName = "First name is required.";

    if (!formData.email)
      tempErrors.email = "Work Email is required.";

    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!validate()) return;

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.firstName + " " + formData.lastName,
            email: formData.email,
            password: formData.password,
            role: "USER",
          }),
        }
      );

      if (response.ok) {
        setSuccessMsg("✅ Registration successful! Redirecting to Login Page...");
        setFormData(initialFormState);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setErrorMsg("❌ Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("❌ Server error. Please try later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group-row">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="John"
          error={errors.firstName}
          required
        />

        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Doe"
        />
      </div>

      <InputField
        label="Work Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="name@company.com"
        error={errors.email}
        required
      />

      <InputField
        label="Company / Firm Name"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Legal IP Solutions"
      />

      <div className="form-group-row">
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••"
          error={errors.password}
          required
        />

        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••"
          error={errors.confirmPassword}
          required
        />
      </div>

      {/* ✅ SUCCESS MESSAGE */}
      {successMsg && (
        <p style={{ color: "green", marginBottom: "10px" }}>
          {successMsg}
        </p>
      )}

      {/* ❌ ERROR MESSAGE */}
      {errorMsg && (
        <p style={{ color: "red", marginBottom: "10px" }}>
          {errorMsg}
        </p>
      )}

      <button type="submit" className="submit-button">
        Register & Start Your IP Journey
      </button>
    </form>
  );
};

export default SignupForm;
