import React, { useEffect, useState } from "react";

import "./App.css";

import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS } from "./apollo/products";

function App() {
  const [products, setProducts] = useState([]);
  const [columns, setColumns] = useState([
    { id: 1, label: "Name", state: true },
    { id: 2, label: "Items count", state: true },
    { id: 3, label: "Archived", state: true },
    { id: 4, label: "Icon", state: true },
    { id: 5, label: "Created", state: true },
    { id: 6, label: "Last import", state: true },
  ]);
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

  const renderCell = (column, product) => {
    switch (column.id) {
      case 1:
        return product.name;
      case 2:
        return product.itemsCount;
      case 3:
        return product.archived ? "true" : "false";
      case 4:
        return product.icon;
      case 5:
        return product.createdAt;
      case 6:
        return product.lastImport;
      default:
        return null;
    }
  };

  const onSelectCheckbox = (e) => {
    const updatedColumns = columns.map((column) => (column.id === parseInt(e.target.value) ? { ...column, state: !column.state } : column));
    setColumns(updatedColumns);
  };

  useEffect(() => {
    if (data && data.collection) {
      setProducts(data.collection.dataSources);
    }
  }, [data]);

  if (loading && products.length === 0) {
    return "Loading...";
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* {JSON.stringify(data)} */}

      {columns.map((column) => {
        return (
          <div className="form-check" key={column.id}>
            <input className="form-check-input" type="checkbox" value={column.id} id={`${column.id}`} checked={column.state === true} onChange={(e) => onSelectCheckbox(e)} />
            <label className="form-check-label" htmlFor={`${column.id}`}>
              {column.label}
            </label>
          </div>
        );
      })}

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
            <tr key={product.id}>{columns.map((column) => column.state && <td key={column.id}>{renderCell(column, product)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
