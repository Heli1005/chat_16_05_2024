import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import "./App.css";


const App = () => {
  return <div className="app">
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </div>;
};

export default App;
