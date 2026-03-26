import React from "react";

const Form_Group = ({ name, placeholder, value, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input
        value={value}
        onChange={onChange}
        type={type || name}
        id={name}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Form_Group;
