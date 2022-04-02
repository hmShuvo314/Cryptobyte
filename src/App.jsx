import React from "react";
import { Homepage, Navbar, Cryptocurrencies } from "./Components";
import "./App.css";
import { Layout, Space, Typography } from "antd";
import { Routes, Route, Link } from "react-router-dom";
import News from "./Components/News";
import CoinDetails from "./Components/CoinDetails";
function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="main">
        <Typography.Title level={1} className="title-welcome">
          Welcome to CryptoByte
        </Typography.Title>
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              ></Route>
              <Route path="/news" element={<News />}></Route>
              <Route
                path="/cryptocurrencies/:id"
                element={<CoinDetails />}
              ></Route>
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            &copy; CryptoByte <br />
            All rights reserved.
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
