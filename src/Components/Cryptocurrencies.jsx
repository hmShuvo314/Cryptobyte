import { Card, Col, Input, Row, Skeleton } from "antd";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    const filteredCryptos = cryptosList?.data?.coins.filter((coins) =>
      coins.name.toLowerCase().includes(input.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [isFetching, input]);
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            value={input}
            placeholder="Search Cryptpcurrency"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {!cryptos
          ? Array.from({ length: 100 }).map((_, i) => (
              <Col xs={4} sm={12} lg={6} className="crypto-card" key={i}>
                <Skeleton active />
              </Col>
            ))
          : cryptos?.map((item) => (
              <Col
                xs={4}
                sm={12}
                lg={6}
                className="crypto-card"
                key={item.uuid}
              >
                <Link to={`/cryptocurrencies/${item.uuid}`}>
                  <Card
                    title={`${item.rank}. ${item.name}`}
                    hoverable
                    extra={<img className="crypto-image" src={item.iconUrl} />}
                  >
                    <p>Price: {millify(item.price)}</p>
                    <p>Market Cap: {millify(item.marketCap)}</p>
                    <p>Daily: {millify(item.change)}</p>
                  </Card>
                </Link>
              </Col>
            ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
