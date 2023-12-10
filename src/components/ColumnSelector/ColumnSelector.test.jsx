import React from "react";
import { render } from "@testing-library/react";
import ColumnsSelector from "./ColumnSelector.jsx";

test("renders ColumnsSelector component", () => {
  render(<ColumnsSelector columns={[]} onSelectCheckbox={() => {}} />);
});

test("renders correct number of checkboxes", () => {
  const columns = [
    { id: 1, name: "Column 1" },
    { id: 2, name: "Column 2" },
    { id: 3, name: "Column 3" },
  ];

  const { container } = render(<ColumnsSelector columns={columns} onSelectCheckbox={() => {}} />);
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  expect(checkboxes.length).toBe(columns.length);
});
