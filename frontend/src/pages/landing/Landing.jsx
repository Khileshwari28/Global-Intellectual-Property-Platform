import "./landing.css";


/* Landing Sections */
import LandingNavbar from "./components/LandingNavbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorks from "./components/HowItWorks";
import PricingPreview from "./components/PricingPreview";
import FeatureComparison from "./components/FeatureComparison";
import Footer from "./components/Footer";

const Landing = () => {
  return (
    <div className="landing-wrapper">
      {/* Top Navigation */}
      <LandingNavbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingPreview />
        <FeatureComparison />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
