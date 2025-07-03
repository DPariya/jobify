import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DashBoard from "./pages/DashBoard";

import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<DashBoard />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
