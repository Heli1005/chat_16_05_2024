import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chat from "./components/Chat";

const App = () => {
  return <>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </>;
};

export default App;
