import {useQuery} from "react-query";
import { fetchCoinHistory } from"../api";
import ReactApexChart from "react-apexcharts";
import {useRecoilValue} from "recoil";
import {isDarkAtom} from "../atoms";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId}: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return(
    <div>
    {isLoading ? (
      "Loading chart..."
    ): (
      <ReactApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price => price.close)) ?? [],
          },
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
            type: "datetime",
            categories: data?.map((price)=> price.time_close),
          },
          fill: {
            type: "gradient",
            gradient: { gradientToColors: ["#0be881"], stops:[0,100]},
          },
          colors: ["#0fbcf9"],
          tooltip: {
            y: {
              formatter: (value)=> `$${value.toFixed(2)}` /*달러 표시 두개 한 이유는 문자열에 달러표시 할려고*/
            }
          }
        }}
      />
    )}
  </div>
  )
}

export default Chart;