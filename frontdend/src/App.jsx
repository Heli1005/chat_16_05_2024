import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";
import "./App.css";
import AuthProvider from "./components/Auth/auth";


const App = () => {
  return <div className="app">
    <AuthProvider>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AuthProvider>
  </div>;
};

export default App;
