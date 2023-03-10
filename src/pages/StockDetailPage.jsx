import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: Math.round(data.c[index] * 100) / 100,
    };
  });
};

export const StockDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState();
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      let oneDay;
      if (date.getDay() === 0) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 1) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;

      try {
        const responses = await Promise.all([
          finnHub.get("stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 60,
            },
          }),
          finnHub.get("stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [symbol]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {chartData && (
        <div>
          <StockChart chartData={chartData} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>
      )}
    </div>
  );
};
