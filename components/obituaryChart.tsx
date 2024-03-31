import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import dayjs from "dayjs";
import { Popup } from "antd-mobile";

interface Iprops {
  chickenId?: string;
}
export const ObituaryChart = memo(({ chickenId }: Iprops) => {
  const [option, setOption] = useState({});
  const [visible2, setVisible2] = useState(false);
  useEffect(() => {
    if (chickenId) getData();
  }, [chickenId]);
  const getData = async () => {
    let res: Record<string, any> = await fetchPost(
      "/obituary/query_page?page=1&size=3",
      {
        dataTime: dayjs().format("YYYY-MM-DD"),
        chickenId,
      },
      {
        "Content-Type": "application/json",
      }
    );
    if (res.code === "0") {
      console.log(res, "res");
      const data = res?.data?.[0]?.list || [];
      let obj = data[0]?.obituaryList?.[0] || {};
      console.log(obj, "obj");
      let opt = {
        title: {
          text: "Depletion rate",
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
        toolbox: {
          feature: {
            saveAsImage: {}, // 下载的按钮
            myFull: {
              // 全屏
              show: true,
              title: visible2 ? "全屏" : "关闭",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: (e) => {
                setVisible2(true);
              },
            },
          },
          show: false,
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
        series: [
          {
            radius: "100%",
            data: [
              obj.chickenSeedlingNumber,
              obj.eliminateNumber,
              obj.deathNumber,
            ],
            type: "bar",
            itemStyle: {
              // color: "#4682B4",
            },
            name: "",
          },
        ],
      };
      setOption(opt);
    }else {
      setOption({title: {
        text: "Depletion rate",
        // show: false,
        textStyle: {
          fontSize: 12,
        },
      }})
    }
  };
  return (
    <>
      <Popup
        visible={visible2}
        onMaskClick={() => {
          setVisible2(false);
        }}
        showCloseButton
        onClose={() => {
          setVisible2(false);
        }}
        bodyStyle={{ height: "100vh" }}
      >
        <div className="pt-7">
          <PieChart type="bar" options={option} />
        </div>
      </Popup>
      <PieChart type="bar" options={option} />
    </>
  );
});
