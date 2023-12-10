import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable/ProductTable";
import ColumnsSelector from "./components/ColumnSelector/ColumnSelector";

import "./App.css";

import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, UPDATE_PRODUCTS } from "./apollo/products";

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
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [updateDataSource] = useMutation(UPDATE_PRODUCTS);

  const onSelectCheckbox = (e) => {
    const updatedColumns = columns.map((column) => (column.id === parseInt(e.target.value) ? { ...column, state: !column.state } : column));
    setColumns(updatedColumns);
  };

  const onInputChange = async (event, productId, columnName) => {
    const newValue = event.target.value === "false" ? false : event.target.value;

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

    try {
      await updateDataSource({
        variables: {
          updateDataSourceId: productId,
          name: columnName === "name" ? newValue : undefined,
          itemsCount: columnName === "itemsCount" ? newValue : undefined,
          archived: columnName === "archived" ? Boolean(newValue) : undefined,
          createdAt: columnName === "createdAt" ? newValue : undefined,
          lastImport: columnName === "lastImport" ? newValue : undefined,
        },
      });
    } catch (error) {
      console.error("Mutation error:", error.message);
      const { data } = await refetch();
      setProducts(data.collection.dataSources);
    }
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
      <ColumnsSelector columns={columns} onSelectCheckbox={onSelectCheckbox} />
      <ProductTable columns={columns} products={products} onInputChange={onInputChange} />
    </>
  );
}

export default App;
