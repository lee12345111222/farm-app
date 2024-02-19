import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import dayjs from "dayjs";
export const ObituaryChart = memo(() => {
  const [option, setOption] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res: Record<string, any> = await fetchPost(
      "/obituary/query_page?page=1&size=1",
      {
        dataTime: dayjs().format("YYYY-MM-DD"),
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      console.log(res, "res");
      const data = res?.data?.[0]?.list?.[0] || {};
      let opt = {
        title: {
          text: "死淘率",
        },
        xAxis: {
          type: "category",
          data: ["本批雞總數", "淘汰了的", "死了的"],
          show: false,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          // formatter: function (params) {
          //   var tar = params[1];
          //   return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          // }
        },
        grid: {
          top: "26%",
          right: "3%",
          left: "0%",
          bottom: "0%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            radius: "100%",
            data: [
              data.chickenSeedlingNumber,
              data.eliminateNumber,
              data.deathNumber,
            ],
            type: "bar",
            itemStyle: {
              color: "#4682B4",
            },
          },
        ],
      };
      setOption(opt);
    }
  };
  return (
    <>
      <PieChart type="bar" options={option} />
    </>
  );
});
