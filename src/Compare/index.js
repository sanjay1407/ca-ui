import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./style.scss";
import { response } from "../mockResponse";
import axios from "axios";
const initialData = {
  easy: {
    id: 71415,
    title: "MULTIPROPOSITO DREMEL 3000 1/26 ACC     ",
    inetPrice: 49990,
    specScore: 65,
    imageScore: 60,
    wordScore: 60
  },
  sodimac: {
    id: 123456,
    title: "Prod2",
    inetPrice: 46908,
    specScore: 60,
    imageScore: 40,
    wordScore: 80
  }
};

const getFormattedResponseForChart = data => {
  const { easy, sodimac } = data;
  const categories = ["Sodimac", "Easy"];
  const overallEasyScore = Math.round(
    easy.specScore + easy.imageScore + easy.wordScore
  ).toFixed(2);
  const overallSodimacScore = Math.round(
    sodimac.specScore + sodimac.imageScore + sodimac.wordScore
  ).toFixed(2);
  const priceOptions = {
    chart: {
      id: "price"
    },
    xaxis: {
      categories
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "70%",

        colors: {
          backgroundBarColors: ["red"],
          backgroundBarOpacity: 1
        }
      },
      pie: {
        donut: {
          labels: {
            show: true
          }
        }
      }
    }
  };
  const contentOptions = {
    chart: {
      id: "content-score"
    },
    xaxis: {
      categories
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "flat",
        columnWidth: "70%",

        colors: {
          backgroundBarColors: ["red"],
          backgroundBarOpacity: 1
        }
      },

      donut: {
        labels: {
          show: true
        }
      }
    }
  };
  const contentSeries = [
    {
      name: "overallScore",
      data: [overallSodimacScore, overallEasyScore]
    }
  ];
  const priceSeries = [
    {
      name: "price",
      data: [sodimac.inetPrice, easy.inetPrice]
    }
  ];
  const imageScoreSeries = [
    {
      name: "image-score",
      data: [sodimac.imageScore, easy.imageScore]
    }
  ];
  const specScoreSeries = [
    {
      name: "technical-specifications",
      data: [sodimac.specScore, easy.specScore]
    }
  ];
  const descriptionScoreSeries = [
    {
      name: "description",
      data: [sodimac.wordScore, easy.wordScore]
    }
  ];

  return {
    price: {
      priceOptions,
      priceSeries
    },
    content: {
      contentOptions,
      contentSeries,
      descriptionScoreSeries,
      specScoreSeries,
      imageScoreSeries
    }
  };
};

const DifferenceContainer = props => {
  const {
    description,
    options = {},
    series = [],
    type = "bar",
    ...others
  } = props;
  return (
    <div className="difference-container">
      <Chart
        options={options}
        series={series}
        height="200"
        width="400"
        type={type}
        {...others}
      />
      <div className="description">{description}</div>
    </div>
  );
};

const TabList = ({ activeTab, setActiveTab, values }) => {
  return values.map((tab, index) => {
    const onTabClick = () => {
      setActiveTab(index);
    };
    return (
      <div
        className={`tab ${index === activeTab ? "active" : ""}`}
        key={tab}
        onClick={onTabClick}
      >
        {tab}
      </div>
    );
  });
};

const brands = response.map(item => item.name);

const Compare = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { series, options } = response[activeTabIndex];
  const query = window.location.search.split("?term=")[1];
  const [data, setData] = useState(initialData);
  const fetchData = async () => {
    let { data, error } = await axios.get(
      `http://localhost:8080/khoj/?term=${query}`
    );
    if (error) {
      setData({});
    } else {
      setData(data.data);
    }
  };

  fetchData(query);
  const chartData = getFormattedResponseForChart(data);

  return (
    <div className="compare">
      <div className="tab-container">
        <TabList
          activeTab={activeTabIndex}
          setActiveTab={setActiveTabIndex}
          values={brands}
        />
      </div>
      <div className="container">
        <div className="comparison-title">
          {`Price and Content comparison for :`}
          <b>{`${data.easy.title}`}</b>
        </div>
        <div className="description-and-trend-wrapper">
          <div className="description-and-trend">
            <DifferenceContainer
              options={chartData.price.priceOptions}
              series={chartData.price.priceSeries}
              description={`Price Comparison`}
            />
            <div className="trend">
              <Chart
                options={options}
                series={series}
                type="line"
                height="300"
              />
              <div className="trend-description">{"Price Trend"}</div>
            </div>
          </div>
          <div className="description-and-trend">
            <DifferenceContainer
              options={chartData.content.contentOptions}
              series={chartData.content.contentSeries}
              description={`Overall Content Score Comparison`}
            />
            <div className="trend">
              <Chart
                options={options}
                series={series}
                type="line"
                height="300"
              />
              <div className="trend-description">
                {"Overall Content Score Trend"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
