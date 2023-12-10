import React, { useEffect, useState } from "react";

import "./App.css";

import { useQuery, useMutation } from "@apollo/client";
import { ALL_PRODUCTS, UPDATE_DATA_SOURCE } from "./apollo/products";

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
  const [updateDataSource] = useMutation(UPDATE_DATA_SOURCE);

  const renderCell = (column, product) => {
    switch (column.id) {
      case 1:
        return ["name", product.name, false];
      case 2:
        return ["itemsCount", product.itemsCount, false];
      case 3:
        return product.archived ? ["archived", "true", false] : ["archived", "false", false];
      case 4:
        return ["icon", product.icon, true];
      case 5:
        return ["createdAt", product.createdAt, false];
      case 6:
        return ["lastImport", product.lastImport, false];
      default:
        return null;
    }
  };

  const onSelectCheckbox = (e) => {
    const updatedColumns = columns.map((column) => (column.id === parseInt(e.target.value) ? { ...column, state: !column.state } : column));
    setColumns(updatedColumns);
  };

  const onInputChange = async (event, productId, columnName) => {
    const newValue = event.target.value;

    try {
      await updateDataSource({
        variables: {
          updateDataSourceId: productId,
          name: columnName === "name" ? newValue : undefined,
          itemsCount: columnName === "itemsCount" ? newValue : undefined,
          archived: columnName === "archived" ? newValue : undefined,
          createdAt: columnName === "createdAt" ? newValue : undefined,
          lastImport: columnName === "lastImport" ? newValue : undefined,
        },
      });
    } catch (error) {
      console.error("Mutation error:", error.message);
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              [columnName]: newValue,
            }
          : product
      )
    );
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
            <tr key={product.id}>
              {columns.map(
                (column) =>
                  column.state && (
                    <td key={column.id}>
                      <input disabled={renderCell(column, product)[2]} value={renderCell(column, product)[1]} onChange={(event) => onInputChange(event, product.id, renderCell(column, product)[0])} />{" "}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
