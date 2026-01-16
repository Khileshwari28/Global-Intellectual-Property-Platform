import BrandingColumn from "../Components/layout/BrandingColumn";
import SignupCard from "../Components/SignupCard";
import "../SignupStyles.css";

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
