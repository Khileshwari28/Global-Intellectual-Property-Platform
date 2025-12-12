import React from 'react';
import { Link } from "react-router-dom";
import SignupForm from './SignupForm';

const SignupCard = () => {
  return (
    <div className="signup-form-card">
      <h2 className="form-title">Create Your Account</h2>
      <SignupForm />
      
      <p className="login-footer">
        By signing up, you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>.
      </p>
      <p className="login-footer">
        Already have an account? 
        <Link to="/login" className="text-blue-600 font-medium">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignupCard;