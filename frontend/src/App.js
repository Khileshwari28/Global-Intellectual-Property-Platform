import React from 'react';
import BrandingColumn from './Components/BrandingColumn';
import SignupCard from './Components/SignupCard';
import './SignupStyles.css'; 

function App() {
  return (
    <div className="page-background">
      {/* Base Document Container  */}
      <div className="base-document-container">
        
        <div className="content-split">
          
          {/* Left Column */}
          <BrandingColumn />
          
          {/* Right Column (The Overlapping Card ) */}
          <SignupCard />
          
          
        </div>
      </div>
    </div>
  );
}

export default App;
