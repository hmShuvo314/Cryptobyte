import { Select, Avatar, Card, Col, Row, Typography, Spin } from "antd";
import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import demo from "../images/demo.jpg";
import Text from "antd/lib/typography/Text";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";

const News = ({ simplified }) => {
  const [options, setOptions] = useState();
  const { data: cryptos, isFetching } = useGetCryptosQuery(100);
  const { data } = useGetCryptoNewsQuery({
    newsCategory: options,
    count: simplified ? 6 : 12,
  });
  console.log({ cryptos, isFetching });
  const { Title } = Typography;
  if (!data)
    return (
      <div className="loading-spin">
        <Spin size="large" />
      </div>
    );
  return (
    <div>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setOptions(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value="Cryptocurency">
                Cryptocurrency
              </Select.Option>
              {cryptos?.data?.coins?.map((currency) => (
                <Select.Option value={currency.name}>
                  {currency.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        )}
        {data?.value?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="nonreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demo}
                    alt={news.name}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)} ...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl || demo
                      }
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
