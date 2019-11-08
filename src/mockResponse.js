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

export const response = [
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
    name: "Paris.cl",
    productsWithHigherPrice: "85",
    productsWithMoreContent: "60",
    series: [
      {
        name: "Sodimac.cl",
        data: [1890, 2000, 1785, 1790, 1800, 1500, 1600, 1400]
      },
      {
        name: "Paris.cl",
        data: [2000, 1600, 1550, 1000, 1500, 1450, 1600, 1350]
      }
    ],
    options: getOptions({ titleOnX: "Sodimac.cl", titleOnY: "Paris.cl" })
  }
];
