import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, Menu } from "antd";
import { Link } from "react-router-dom";
import icon from "../images/cryptocurrency.png";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  MonitorOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => setToggleNav(false));
  }, []);
  return (
    <div className={`nav-container ${toggleNav ? "open" : ""}`}>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          setToggleNav(!toggleNav);
        }}
      >
        <MenuUnfoldOutlined />
      </Button>
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">CryptoByte</Link>
        </Typography.Title>
      </div>

      <Menu theme="dark">
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        </Menu.Item>
        <Menu.Item icon={<MonitorOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
