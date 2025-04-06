import { memo } from "react";
import ReactECharts from "echarts-for-react";

import * as echarts from "echarts";

const getLineOption = () => {
  let xLabel = ["3.26", "3.27", "3.28", "3.29", "3.30", "3.31"];
  let goToSchool = ["40", "60", "22", "85", "50", "40"];
  let goOutSchool = ["20", "50", "12", "65", "30", "60"];

  let option = {
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
                color: "rgba(126,199,255,0)", // 0% 處的颜色
              },
              {
                offset: 0.5,
                color: "rgba(126,199,255,1)", // 100% 處的颜色
              },
              {
                offset: 1,
                color: "rgba(126,199,255,0)", // 100% 處的颜色
              },
            ],
            global: false, // 缺省為 false
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
          //坐標轴轴线相關設置。數学上的x轴
          show: false,
          lineStyle: {
            color: "#233653",
          },
        },
        axisLabel: {
          //坐標轴刻度標签的相關設置
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
        name: "人數",
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
        symbol: "circle", // 默認是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 1,
            color: "#308BF2", // 线條颜色
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
            //线性渐變，前4個參數分别是x0,y0,x2,y2(范围0~1);相當於图形包围盒中的百分比。如果最後一個參數是‘true’，则該四個值是绝對像素位置。
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
            shadowBlur: 20, //shadowBlur設图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 設置图形的阴影效果。
          },
        },
        data: goToSchool,
      },
    ],
  };
  return option;
};

const getBarOption = () => {
  return {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      show: false,
    },
    grid: {
      top: "15%",
      right: "3%",
      left: "5%",
      bottom: "12%",
    },
    yAxis: {
      type: "value",
      show: false,
    },
    series: [
      {
        radius: "100%",
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        itemStyle: {
          color: "#3985F5",
        },
      },
    ],
  };
};
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
};

const getDoubouleOptions = () => {
  return {
    title: {
      // text: "哎呦,不錯哦",
      textStyle: {
        align: "center",
        color: "#fff",
        fontSize: 20,
      },
      top: "5%",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
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
                color: "rgba(0, 255, 233,0)",
              },
              {
                offset: 0.5,
                color: "rgba(255, 255, 255,1)",
              },
              {
                offset: 1,
                color: "rgba(0, 255, 233,0)",
              },
            ],
            global: false,
          },
        },
      },
    },
    grid: {
      top: "5%",
      left: "5%",
      right: "5%",
      bottom: "15%",
      // containLabel: true
    },
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#C8C8C8",
          },
        },
        axisTick: {
          show: false,
        },
        splitArea: {
          // show: true,
          color: "#f00",
          lineStyle: {
            color: "#C8C8C8",
          },
        },
        axisLabel: {
          color: "#fff",
        },
        splitLine: {
          show: false,
        },
        boundaryGap: false,
        data: ["A", "B", "C", "D", "E", "F"],
      },
    ],

    yAxis: [
      {
        type: "value",
        min: 0,
        // max: 140,
        splitNumber: 4,
        splitLine: {
          show: false,
          lineStyle: {
            color: "#C8C8C8",
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#C8C8C8",
          },
        },
        axisLabel: {
          show: false,
          margin: 20,
          textStyle: {
            color: "#d1e6eb",
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: "",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 7,
        // lineStyle: {
        //   normal: {
        //     color: "#6c50f3",
        //     shadowColor: "rgba(0, 0, 0, .3)",
        //     shadowBlur: 0,
        //     shadowOffsetY: 5,
        //     shadowOffsetX: 5,
        //   },
        // },
        label: {
          show: false,
          position: "top",
          textStyle: {
            color: "#6c50f3",
          },
        },
        itemStyle: {
          color: "#308BF2",
          // borderColor: "#fff",
          // borderWidth: 3,
          // shadowColor: "rgba(0, 0, 0, .3)",
          // shadowBlur: 0,
          // shadowOffsetY: 2,
          // shadowOffsetX: 2,
        },
        // tooltip: {
        //   show: false,
        // },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(48, 139, 242,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(48, 139, 242,0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(48, 139, 242, 0.5)",
            shadowBlur: 20,
          },
        },
        data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
      },
      {
        name: "",
        type: "line",
        // smooth: true, //是否平滑
        showAllSymbol: true,
        // symbol: 'image://./static/images/guang-circle.png',
        symbol: "circle",
        symbolSize: 7,
        // lineStyle: {
        //   normal: {
        //     color: "#00ca95",
        //     shadowColor: "rgba(0, 0, 0, .3)",
        //     shadowBlur: 0,
        //     shadowOffsetY: 5,
        //     shadowOffsetX: 5,
        //   },
        // },
        label: {
          show: false,
          position: "top",
          textStyle: {
            color: "#00ca95",
          },
        },

        itemStyle: {
          color: "#308BF2",
          // borderColor: "#fff",
          // borderWidth: 3,
          // shadowColor: "rgba(0, 0, 0, .3)",
          // shadowBlur: 0,
          // shadowOffsetY: 2,
          // shadowOffsetX: 2,
        },
        // tooltip: {
        //   show: false,
        // },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(48, 139, 242,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(48, 139, 242,0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(48, 139, 242, 0.9)",
            shadowBlur: 20,
          },
        },
        data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
      },
    ],
  };
};
const Obj = {
  line: getLineOption(),
  bar: getBarOption(),
  pie: getOption(),
  doubouleOptions:getDoubouleOptions()
};
interface Iporps {
  type: "line" | "bar" | "pie" | "doubouleOptions";
  options?: Record<string,any>
}
const PieChart = memo(({ type='line', options }: Iporps) => {
  return (
    <ReactECharts className="w-[100%] !h-[100%]" option={options || Obj[type]} />
  );
});
export default PieChart;
