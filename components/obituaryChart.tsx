import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import dayjs from "dayjs";
import { Popup } from "antd-mobile";
export const ObituaryChart = memo(() => {
  const [option, setOption] = useState({});
  const [visible2, setVisible2] = useState(false);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let res: Record<string, any> = await fetchPost(
      "/obituary/query_page?page=1&size=3",
      {
        dataTime: dayjs().format("YYYY-MM-DD"),
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      console.log(res, "res");
      const data = res?.data?.[0]?.list || [];

      console.log(data, "data");
      let opt = {
        title: {
          text: "死淘率",
          textStyle: {
            fontSize: 12,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        // 右上角下载的按钮
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}, // 下载的按钮
        //     myFull: {
        //       // 全屏
        //       show: true,
        //       title: "全屏",
        //       icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
        //       onclick: (e) => {
        //         const element = document.querySelector(
        //           ".vehicleProvince canvas"
        //         );
        //         console.log(element, "element");
        //         // 全屏查看
        //         if (element.requestFullScreen) {
        //           // HTML W3C 提议
        //           element.requestFullScreen();
        //         } else if (element.msRequestFullscreen) {
        //           // IE11
        //           element.msRequestFullScreen();
        //         } else if (element.webkitRequestFullScreen) {
        //           // Webkit (works in Safari5.1 and Chrome 15)
        //           element.webkitRequestFullScreen();
        //         } else if (element.mozRequestFullScreen) {
        //           // Firefox (works in nightly)
        //           element.mozRequestFullScreen();
        //         }
        //         // 退出全屏
        //         if (element.requestFullScreen) {
        //           document.exitFullscreen();
        //         } else if (element.msRequestFullScreen) {
        //           document.msExitFullscreen();
        //         } else if (element.webkitRequestFullScreen) {
        //           document.webkitCancelFullScreen();
        //         } else if (element.mozRequestFullScreen) {
        //           document.mozCancelFullScreen();
        //         }
        //       },
        //     },
        //   },
        // },

        // 右上角下载的按钮
        toolbox: {
          feature: {
            saveAsImage: {}, // 下载的按钮
            myFull: {
              // 全屏
              show: true,
              title:  visible2? "全屏":'关闭',
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: (e) => {
                console.log(visible2,'vis')
                setVisible2(!visible2)
              },
            },
          },
        },

        grid: {
          top: "26%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        xAxis: {
          type: "category",
          data: ["本批雞總數", "淘汰了的", "死了的"],
          show: false,
        },
        series: data.map((ele) => ({
          radius: "100%",
          data: [
            ele.chickenSeedlingNumber,
            ele.eliminateNumber,
            ele.deathNumber,
          ],
          type: "bar",
          itemStyle: {
            // color: "#4682B4",
          },
          name: ele.id,
        })),
        // title: {
        //   text: "死淘率",
        //   textStyle: {
        //     fontSize: 12,
        //   },
        // },
        // legend: {
        //   show: false
        // },
        // xAxis: {
        //   type: "category",
        //   data: ["本批雞總數", "淘汰了的", "死了的"],
        //   show: false,
        // },
        // tooltip: {
        //   trigger: "axis",
        //   axisPointer: {
        //     type: "shadow",
        //   },
        //   // formatter: function (params) {
        //   //   var tar = params[1];
        //   //   return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        //   // }
        // },
        // grid: {
        //   top: "1%",
        //   right: "3%",
        //   left: "0%",
        //   // bottom: "0%",
        //   containLabel: true,
        // },
        // yAxis: {
        //   type: "value",
        //   show: false,
        // },
        // series: data.map((ele) => [
        //   {
        //     // radius: "100%",
        //     data: [
        //       ele.chickenSeedlingNumber,
        //       ele.eliminateNumber,
        //       ele.deathNumber,
        //     ],
        //     type: "bar",
        //     itemStyle: {
        //       // color: "#4682B4",
        //     },
        //     name: ele.id,
        //   },
        // ]),
      };
      setOption(opt);
    }
  };
  return (
    <>
      <Popup
        visible={visible2}
        onMaskClick={() => {
          setVisible2(false);
        }}
        bodyStyle={{ height: "100vh" }}
      >
        <PieChart type="bar" options={option} />
      </Popup>
      <PieChart type="bar" options={option} />
    </>
  );
});
