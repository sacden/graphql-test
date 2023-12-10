import React from "react";
import { renderCell } from "../../helpers/renderCell";

const ProductTable = ({ columns, products, onInputChange }) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          {columns.map((column) => {
            return column.state ? (
              <th key={column.id} scope="col">
                {column.label}
              </th>
            ) : null;
          })}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            {columns.map(
              (column) =>
                column.state && (
                  <td key={column.id}>
                    {column.id === 3 ? (
                      <select value={String(product.archived)} onChange={(event) => onInputChange(event, product.id, "archived")}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : (
                      <input disabled={renderCell(column, product)[2]} value={renderCell(column, product)[1]} onChange={(event) => onInputChange(event, product.id, renderCell(column, product)[0])} />
                    )}
                  </td>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
