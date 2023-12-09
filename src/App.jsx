import React, { useEffect, useState } from "react";

import "./App.css";

import { useQuery } from "@apollo/client";
import { ALL_PRODUCTS } from "./apollo/products";

function App() {
  const [products, setProducts] = useState([]);
  const { loading, error, data } = useQuery(ALL_PRODUCTS);

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
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Items count</th>
            <th scope="col">Archived</th>
            <th scope="col">Icon</th>
            <th scope="col">Created</th>
            <th scope="col">Last import</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.itemsCount}</td>
                <td>{product.archived === true ? "true" : "false"}</td>
                <td>{product.icon}</td>
                <td>{product.createdAt}</td>
                <td>{product.lastImport}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
