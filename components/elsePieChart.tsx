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
      { farmId: query.id, dataTime: timeRes.data?.[0] },
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      const data = res?.data || {};
      const total = Number(data.intermediate) + Number(data.resistant) + Number(data.sensitive);
      console.log(data,total, "res23");

      let opt = {
        title: {
          text: "Ast",
          // show: false,
          textStyle: {
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "item",
          valueFormatter: val => parseInt(((val/total)*100).toString())+'%',
          // show: false,
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
            radius: "80%",
            data: [
              { value: data.intermediate, name: "intermediate" },
              { value: data.resistant, name: "resistant" },
              { value: data.sensitive, name: "sensitive" },
            ],
            label: {
              show: false,
              position: 'inside'
            },
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
