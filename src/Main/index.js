import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./style.scss";

const getOptions = ({ titleOnX, titleOnY }) => {
  return {
    dataLabels: {
      enabled: false
    },
    colors: ["#FF1654", "#247BA0"],

    stroke: {
      width: [4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: "20%"
      }
    },
    xaxis: {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#FF1654"
        },
        labels: {
          style: {
            color: "#FF1654"
          }
        },
        title: {
          text: titleOnX,
          style: {
            fontSize: "20px"
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: "#247BA0"
        },
        labels: {
          style: {
            color: "#247BA0"
          }
        },
        title: {
          text: titleOnY,
          style: {
            fontSize: "20px"
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: true
      }
    },
    legend: {
      horizontalAlign: "center",
      fontSize: "20px"
    }
  };
};
const DifferenceContainer = ({ options, description }) => (
  <div className="difference-container">
    <Chart
      options={options}
      series={options.series}
      height="200"
      type="radialBar"
    />
    <div className="diff-desc">{description}</div>
  </div>
);

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
        ss
      >
        {tab}
      </div>
    );
  });
};

const response = [
  {
    brandId: "easy",
    name: "Easy.cl",
    productsWithHigherPrice: "70",
    productsWithMoreContent: "30",
    series: [
      {
        name: "Sodimac.cl",
        data: [1890, 2000, 1785, 1790, 1800, 1500, 1600, 1400]
      },
      {
        name: "Easy.cl",
        data: [2000, 1600, 1550, 1000, 1500, 1450, 1600, 1350]
      }
    ],
    options: getOptions({ titleOnX: "Sodimac.cl", titleOnY: "Easy.cl" })
  },
  {
    brandId: "ripley",
    name: "Ripley.com",
    productsWithHigherPrice: "50",
    productsWithMoreContent: "60",
    series: [
      {
        name: "Sodimac.cl",
        data: [1890, 2000, 1785, 1790, 1800, 1500, 1600, 1400]
      },
      {
        name: "Ripley.com",
        data: [1750, 2200, 1963, 1990, 1800, 1700, 1400, 1200]
      }
    ],
    options: getOptions({ titleOnX: "Sodimac.cl", titleOnY: "Ripley.com" })
  },
  {
    brandId: "falabella",
    name: "Falabella.com",
    productsWithHigherPrice: "85",
    productsWithMoreContent: "60",
    series: [
      {
        name: "Sodimac.cl",
        data: [1890, 2000, 1785, 1790, 1800, 1500, 1600, 1400]
      },
      {
        name: "Falabella.com",
        data: [2000, 1600, 1550, 1000, 1500, 1450, 1600, 1350]
      }
    ],
    options: getOptions({ titleOnX: "Sodimac.cl", titleOnY: "Falabella.com" })
  }
];

const Main = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const brands = response.map(item => item.name);
  const {
    productsWithHigherPrice,
    productsWithMoreContent,
    name,
    series,
    options
  } = response[activeTabIndex];

  const chartOptions = {
    price: {
      series: [productsWithHigherPrice],
      labels: ["Price"]
    },
    content: {
      series: [productsWithMoreContent],
      labels: ["Content"]
    }
  };
  return (
    <div className="main">
      <div className="tab-container">
        <TabList
          activeTab={activeTabIndex}
          setActiveTab={setActiveTabIndex}
          values={brands}
        />
      </div>
      <div className="container">
        <div className="description-and-trend">
          <DifferenceContainer
            options={chartOptions.price}
            description={`There are ${productsWithHigherPrice}% Products in ${name} with higher price`}
          />
          <div className="trend">
            <Chart options={options} series={series} type="line" height="300" />
          </div>
        </div>
        <div className="description-and-trend">
          <DifferenceContainer
            options={chartOptions.content}
            description={`There are ${productsWithMoreContent}% Products in ${name} with better content score`}
          />
          <div className="trend">
            <Chart options={options} series={series} type="line" height="300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
