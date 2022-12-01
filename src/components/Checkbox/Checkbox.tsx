import React from 'react';
import './Checkbox.scss';

const Checkbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: any }) => {
  return (
    <div className="my-checkbox">
      <input
        id={`checkbox${label}`}
        className="my-checkbox__input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      ></input>
      <label htmlFor={`checkbox${label}`} className="my-checkbox__label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
