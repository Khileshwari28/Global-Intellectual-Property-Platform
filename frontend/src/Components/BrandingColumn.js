import React from 'react';

const BrandingColumn = () => {
  return (
    <div className="branding-column">
      <h1 className="branding-headline">
        
        <span className="headline-desktop-only">
          Global IP Platform: Your Digital IP Command Center
        </span>
        
        
        <span className="headline-mobile-only">
          Global IP Platform
        </span>
      </h1>
      
      
      <div className="desktop-content-only">
       
        <ul className="benefit-list">
          <li>✅ Global Patent & Trademark Search</li>
          <li>✅ Real-time Portfolio Management</li>
          <li>✅ AI-Driven Legal Insights & Alerts</li>
        </ul>
        
      

        <p style={{marginTop: '40px', fontSize: '14px', fontStyle: 'italic'}}>
          "Protecting innovation worldwide, one registration at a time."
        </p>
      </div>
      
    </div>
  );
};

export default BrandingColumn;