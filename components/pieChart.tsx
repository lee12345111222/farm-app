import { memo } from "react";
import ReactECharts from "echarts-for-react";

const PieChart = memo(() => {
  const getOption = () => {
    return {
      title: {
        text: "Referer of a Website",
        subtext: "Fake Data",
        left: "center",
        show: false,
      },
      tooltip: {
        trigger: "item",
        show: false,
      },
      legend: {
        orient: "vertical",
        left: "left",
        show: false,
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "100%",
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
          labelLine:{show: false},
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  };
  return <ReactECharts className="w-[100%] !h-[100%]" option={getOption()} />;
});
export default PieChart;
