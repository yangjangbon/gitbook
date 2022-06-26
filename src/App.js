import "./assets/css/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Timer from "./pages/Timer";
import Commit from "./pages/Commit";
import Add from "./pages/Add";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              {" "}
            </Route>
            <Route path="/add" element={<Add />}>
              {" "}
            </Route>
            <Route path="/timer/:branchName" element={<Timer />}>
              {" "}
            </Route>
            <Route path="/commit/:branchName" element={<Commit />}>
              {" "}
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
};
export default App;
