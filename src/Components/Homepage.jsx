import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { Spin } from "antd";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);

  if (isFetching)
    return (
      <div className="loading-spin">
        <Spin size="large" />
      </div>
    );

  const {
    total,
    totalExchanges,

    totalMarketCap,
    totalMarkets,
    total24hVolume,
  } = data?.data?.stats;
  return (
    <>
      <Title level={2} className="heading">
        Global Statistics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={millify(total)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 4h Volume" value={millify(total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(totalMarkets)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title className="show-more" level={2}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Latest Crypto News
        </Title>
        <Title className="show-more" level={2}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
