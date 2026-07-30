import React from "react";
import BrandingColumn from "../../user/layout/BrandingColumn";
import SignupCard from "./SignupCard";
import "../styles/SignupStyles.css"; 

const Register = () => {
  return (
    <div className="page-background">
      <div className="base-document-container">
        <div className="content-split">
          <BrandingColumn />
          <SignupCard />
        </div>
      </div>
    </div>
  );
};

export default Register;
