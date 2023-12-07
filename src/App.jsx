import React from "react";

import "./App.css";

function App() {
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Items count</th>
            <th scope="col">Created</th>
            <th scope="col">Last update</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default App;
