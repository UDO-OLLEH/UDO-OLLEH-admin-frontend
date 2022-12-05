import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import TravelCoursePage from "./Pages/TravelCourse";
import RestaurantPage from "./Pages/Restaurant";
import MenuPage from "./Pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/travelCourse" element={<TravelCoursePage />}></Route>
        <Route path="/restaurant" element={<RestaurantPage />}></Route>
        <Route path="/restaurant/:id" element={<MenuPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
