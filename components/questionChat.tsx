import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import { selectUser, useSelector } from "@/lib/redux";
import { QuestionFilter } from "@/pages/farm";
export const QuestionChart = memo(({ filter }: { filter?: string }) => {
  const query = useSelector(selectUser);
  const [option, setOption] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let data = [];
    if (chartData.length === 0) return;
    if (filter === QuestionFilter[0]) {
      let sortData = chartData.sort(
        (a, b) =>
          (a?.scores?.[0]?.totalScore || 0) - (b?.scores?.[0]?.totalScore || 0)
      );
      sortData.forEach((ele) => {
        data.push({
          farmId: ele.farmId,
          farmIdName: ele.farmIdName,
          ...ele.scores[0],
        });
      })
    } else {
      chartData.forEach((ele) => {
        ele.scores = ele?.scores.sort(
          (a, b) => (a?.totalScore || 0) - (b?.totalScore || 0)
        );
        if (query.id === ele.farmId) {
          ele?.scores?.forEach((item) => {
            data.push({
              farmId: ele.farmId,
              farmIdName: ele.farmIdName,
              ...item,
            });
          });
        }else {
          if(ele.scores.length > 1){
            data.push({
              farmId: ele.farmId,
              farmIdName: ele.farmIdName,
              ...ele.scores[0],
            })
            data.push({
              farmId: ele.farmId,
              farmIdName: ele.farmIdName,
              ...ele.scores[ele.scores.length - 1],
            })
          }else{
            data.push({
              farmId: ele.farmId,
              farmIdName: ele.farmIdName,
              ...ele.scores[0],
            })
          }
        }
      });
      data = []
      console.log(data, "filter", filter);
    }
    let opt = {
      title: {
        text: "Bio-Security Questionnaire",
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
          data: data.map((ele) => {
            return {
              value: ele.totalScore,
              itemStyle: {
                color: getColor(ele),
              },
            };
          }),
          type: "bar",
          // itemStyle: {
          //   color: "#4682B4",
          // },
        },
      ],
    };
    setOption(opt);
  }, [filter, chartData]);

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
      let data = res?.data || [];

      setChartData(data);
    } else {
      setChartData([]);
      setOption({
        title: {
          text: "Questionnaire",
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
