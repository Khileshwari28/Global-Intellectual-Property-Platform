import React, { useState } from 'react';
import InputField from './InputField';
import { Navigate, useNavigate } from "react-router-dom";


const initialFormState = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignupForm = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    
    //First name is required
    if (!formData.firstName) tempErrors.firstName = "First name is required.";
    
    // Email is required 
    if (!formData.email) tempErrors.email = "Work Email is required.";
    
    // Checking length of password
    if (!formData.password) {
        tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
        tempErrors.password = "Password must be at least 6 characters.";
    }
    
    // Password matching
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     console.log('FORM SUBMITTED. Data ready for Spring Boot:', formData);
  //     alert('Signup Successful! (Check console for data log)');
  //     // *** API CALL WILL GO HERE LATER ***
  //     setFormData(initialFormState);  //to clear form on success
  //   } else {
  //     console.log('Form has validation errors.');
  //   }
  // };
  
const handleSubmit = async (e) => {
  e.preventDefault();

 // if (validate()) {
//     try {
//       const response = await fetch("http://localhost:8080/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: formData.firstName + " " + formData.lastName,
//           email: formData.email,
//           password: formData.password,
//           role: "USER"
//         })
//       });

//       if (response.ok) {
//         alert("Signup Successful!");
//         setFormData(initialFormState);
//       } else {
//         alert("Failed to register. Check backend.");
//       }

//     } catch (error) {
//       console.error("Error:", error);
//       alert("Server error");
//     }
//   }
 
   Navigate("/dashboard")  // Redirect to dashboard after signup
 };
  

  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group-row">
        <InputField
          label="First Name" name="firstName" value={formData.firstName}
          onChange={handleChange} placeholder="John" error={errors.firstName}
          required={true} 
        />
        <InputField
          label="Last Name" name="lastName" value={formData.lastName}
          onChange={handleChange} placeholder="Doe" error={errors.lastName}
         
        />
      </div>

      <InputField
        label="Work Email" name="email" type="email" value={formData.email}
        onChange={handleChange} placeholder="name@company.com" error={errors.email}
        required={true} 
      />
      
      <InputField
        label="Company / Firm Name" name="company" value={formData.company}
        onChange={handleChange} placeholder="Legal IP Solutions"
      />

      <div className="form-group-row">
        <InputField
          label="Password" name="password" type="password" value={formData.password}
          onChange={handleChange} placeholder="••••••" error={errors.password}
          required={true} 
        />
        <InputField
          label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword}
          onChange={handleChange} placeholder="••••••" error={errors.confirmPassword}
          required={true}
        />
      </div>

      <button type="submit" className="submit-button">
        Register & Start Your IP Journey
      </button>
    </form>
  );
};

export default SignupForm;