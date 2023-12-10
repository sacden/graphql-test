import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable/ProductTable";
import ColumnsSelector from "./components/ColumnSelector/ColumnSelector";

import "./App.css";

import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCTS, UPDATE_PRODUCTS } from "./apollo/products";

function App() {
  // State to manage product data and column visibility
  const [products, setProducts] = useState([]);
  const [columns, setColumns] = useState([
    { id: 1, label: "Name", state: true },
    { id: 2, label: "Items count", state: true },
    { id: 3, label: "Archived", state: true },
    { id: 4, label: "Icon", state: true },
    { id: 5, label: "Created", state: true },
    { id: 6, label: "Last import", state: true },
  ]);

  // GraphQL queries and mutations
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [updateDataSource] = useMutation(UPDATE_PRODUCTS);

  // Function to handle checkbox selection in column selector
  const onSelectCheckbox = (e) => {
    const updatedColumns = columns.map((column) => (column.id === parseInt(e.target.value) ? { ...column, state: !column.state } : column));
    setColumns(updatedColumns);
  };

  // Function to handle input changes in the product table
  const onInputChange = async (event, productId, columnName) => {
    //In case we are getting "false" as string, use this hack
    const newValue = event.target.value === "false" ? false : event.target.value;

    // Update local state immediately for a responsive UI
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
      // Attempt to update data on the server
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
      // Refetch the data and update the local state if there's an error
      const { data } = await refetch();
      setProducts(data.collection.dataSources);
    }
  };

  // Effect to update local state when data changes
  useEffect(() => {
    if (data && data.collection) {
      setProducts(data.collection.dataSources);
    }
  }, [data]);

  // Loading and error handling
  if (loading && products.length === 0) {
    return "Loading...";
  }
  if (error) return <p>Error: {error.message}</p>;

  // Render the component with column selector and product table
  return (
    <>
      <ColumnsSelector columns={columns} onSelectCheckbox={onSelectCheckbox} />
      <ProductTable columns={columns} products={products} onInputChange={onInputChange} />
    </>
  );
}

export default App;
