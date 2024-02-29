import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import { selectUser, useSelector } from "@/lib/redux";
import * as echarts from "echarts";

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
      console.log(res, "res23");
      const data = res?.data || {};
      let xLabel = ["3.26", "3.27", "3.28", "3.29", "3.30", "3.31"];
      let goToSchool = ["40", "60", "22", "85", "50", "40"];
      let opt = {
        // backgroundColor: "#fff",
        title: {
          text: "270k",
          textStyle: {
            align: "center",
            color: "#4682B4",
            fontSize: 18,
          },
          top: "5%",
          left: "5%",
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "transparent",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(126,199,255,0)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(126,199,255,1)", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(126,199,255,0)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        },
        grid: {
          top: "15%",
          left: "10%",
          right: "10%",
          bottom: "15%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: false,
              lineStyle: {
                color: "#233653",
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#7ec7ff",
                padding: 16,
                fontSize: 14,
              },
              formatter: function (data: any) {
                return data;
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#192a44",
              },
            },
            axisTick: {
              show: false,
            },
            show: false,
            data: xLabel,
          },
        ],
        yAxis: [
          {
            name: "人数",
            show: false,
            nameTextStyle: {
              color: "#7ec7ff",
              fontSize: 16,
              padding: 10,
            },
            min: 0,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#192a44",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#233653",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#7ec7ff",
                padding: 16,
              },
              formatter: function (value: number) {
                if (value === 0) {
                  return value;
                }
                return value;
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "上学",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 0,
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: "#308BF2", // 线条颜色
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
              color: "#308BF2",
              borderColor: "#646ace",
              borderWidth: 1,
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(25,163,223,.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(25,163,223, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: goToSchool,
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
