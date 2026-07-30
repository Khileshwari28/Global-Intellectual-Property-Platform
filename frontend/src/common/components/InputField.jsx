import React from 'react';

const InputField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '', // make optional with default empty string
  error = null,     // make optional with default null
  required = false,
  readOnly = false,
}) => {
  return (
    <div className="form-group" style={{ position: 'relative' }}>
      <label htmlFor={name}>
        {label}
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
        readOnly={readOnly} // Apply readOnly
        className={readOnly ? 'readonly-input' : ''}
        style={{
          paddingRight: '30px', // space for pencil icon if needed
          backgroundColor: readOnly ? '#f5f5f5' : '#fff',
        }}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default InputField;
