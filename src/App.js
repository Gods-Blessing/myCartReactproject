import React from "react";
import { useSelector } from "react-redux";
import themeReducer from "./reducers/themeReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/navbar/Navbar";
import Main from "./components/Main.js/Main";
import Favourites from "./components/favourites/Favourites";
import Product from "./components/Product/Product";

function App() {
  const ans = useSelector((state)=>state.theme);
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/cart" element={<Favourites/>}/>
        <Route path="/product" element={<Product/>}/>

      </Routes>
      </BrowserRouter>
  );
}

export default App;
