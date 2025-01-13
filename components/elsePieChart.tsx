import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import { selectUser, useSelector } from "@/lib/redux";
export const ElsePieChart = memo(({elseParams} : {elseParams: Record<string, any>}) => {
  const [option, setOption] = useState({});
  const query = useSelector(selectUser);
  console.log(elseParams, "elseParams");
  useEffect(() => {
    if (query.id) getData();
  }, [query, elseParams]);
  const getData = async () => {
    // let timeRes = await fetchPost(
    //   "/farmOtherAttributes/query_date",
    //   { farmId: query.id },
    //   {
    //     "Content-Type": "application/json",
    //   }
    // );
    // console.log(timeRes, "AST Profile time");
    console.log(query, "query.farmName", elseParams);
    let res: Record<string, any> = await fetchPost(
      "/farmOtherAttributes/query_page?page=1&size=10",
      { farmName: query.farmName },
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      const list = res?.data?.[0]?.list?.[0]?.farmOtherAttributes || {};
      const data = list.filter(item => {
        return item.bacterialType.includes(elseParams.bacterialType || '') && item.antibiotic.includes(elseParams.antibiotic || '')
      })[0] || {}
      const total = Number(data.intermediate) + Number(data.resistant) + Number(data.sensitive);
      console.log(data,total, "AST Profile data");

      let opt = {
        title: {
          text: "AST Profile",
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
        // intermediate, resistant, sensitive
        color: ["#ffff00", "#008000", "#ff0000"],
      };
      setOption(opt);
    }else {
      setOption({title: {
        text: "AST Profile",
        // show: false,
        textStyle: {
          fontSize: 12,
        },
      }})
    }
  };
  return (
    <>
      <PieChart type="bar" options={option} />
    </>
  );
});
