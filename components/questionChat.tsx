import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import { selectUser, useSelector } from "@/lib/redux";
export const QuestionChart = memo(() => {
  const query = useSelector(selectUser);
  const [option, setOption] = useState({});
  useEffect(() => {
    getData();
  }, []);
  const getColor = (item) => {
    if (query.id === item.farmId) {
      const score = item?.scores?.[0]?.totalScore;
      if (score < 60) {
        return "red";
      } else if (score <= 80 && score >= 60) {
        return "yellow";
      } else if (score > 80) {
        return "green";
      }
    } else {
      return "#4682B4";
    }
  };
  const getData = async () => {
    let res: Record<string, any> = await fetchPost(
      "/score/query_total_score",
      {},
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      console.log(res, "res");
      const data = res?.data || [];
      let opt = {
        title: {
          text: "問卷",
          textStyle: {
            fontSize: 12,
          },
        },
        xAxis: {
          type: "category",
          data: data.map((ele) => ele.farmIdName),
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
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            radius: "100%",
            data: data.map((ele) => ({
              value: ele?.scores?.[0]?.totalScore,
              itemStyle: {
                color: getColor(ele),
              },
            })),
            type: "bar",
            // itemStyle: {
            //   color: "#4682B4",
            // },
          },
        ],
      };
      setOption(opt);
    } else {
      setOption({
        title: {
          text: "問卷",
          // show: false,
          textStyle: {
            fontSize: 12,
          },
        },
      });
    }
  };
  return (
    <>
      <PieChart type="bar" options={option} />
    </>
  );
});
