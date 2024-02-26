import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import { selectUser, useSelector } from "@/lib/redux";
export const ElsePieChart = memo(() => {
  const [option, setOption] = useState({});
  const query = useSelector(selectUser);

  useEffect(() => {
    if (query.id) getData();
  }, [query]);
  const getData = async () => {
    let timeRes = await fetchPost(
      "/farmOtherAttributes/query_date",
      { farmId: query.id },
      {
        "Content-Type": "application/json",
      }
    );
    console.log(timeRes, "time");
    let res: Record<string, any> = await fetchPost(
      "/farmOtherAttributes/query_info",
      { farmId: query.id },
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      console.log(res, "res");
      const data = res?.data || [];
      let opt = {
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
            // name: "Access From",
            type: "pie",
            radius: "100%",
            data: [
              { value: 1048, name: "" },
              { value: 735, name: "" },
              { value: 580, name: "" },
              { value: 484, name: "" },
              { value: 300, name: "" },
            ],
            labelLine: { show: false },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
        color: ["#00acee", "#52cdd5", "#79d9f1", "#a7e7ff", "#c8efff"],
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
