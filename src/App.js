import React from "react";
import Header from "./product/header";
import SearchInput from "./product/search";
import ProductList from "./product/productList";

function App() {
  return (
    <div className="App">
      <Header />
      <SearchInput />
      <ProductList />
    </div>
  );
}

export default App;
