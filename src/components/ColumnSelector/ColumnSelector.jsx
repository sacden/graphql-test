import React from "react";

const ColumnsSelector = ({ columns, onSelectCheckbox }) => {
  return columns.map((column) => {
    return (
      <div className="form-check" key={column.id}>
        <input className="form-check-input" type="checkbox" value={column.id} id={`${column.id}`} checked={column.state === true} onChange={(e) => onSelectCheckbox(e)} />
        <label className="form-check-label" htmlFor={`${column.id}`}>
          {column.label}
        </label>
      </div>
    );
  });
};

export default ColumnsSelector;
