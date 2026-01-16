import React from 'react';


const InputField = ({ label, name, type = 'text', value, onChange, placeholder, error, required = false }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label}
        {/*red asterisk*/}
        {required && <span style={{ color: 'red', marginLeft: '5px' }}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required} 
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;