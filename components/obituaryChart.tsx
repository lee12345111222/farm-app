import { memo, useEffect, useState } from "react";
import PieChart from "./pieChart";
import { fetchPost } from "@/utils/request";
import dayjs from "dayjs";
import { Popup } from "antd-mobile";
import { selectUser, useSelector } from "@/lib/redux";
import { BatchTimeFilter } from "@/pages/farm";

interface Iprops {
  chickenId?: string;
  showFarm?: boolean;
  timeFilter?: string;
}

const startYear = dayjs().startOf("year").valueOf();
const startMonth = dayjs().startOf("month").valueOf();

console.log(startYear, startMonth, "startYear");

export const ObituaryChart = memo(
  ({ chickenId, showFarm, timeFilter }: Iprops) => {
    const [option, setOption] = useState({});
    const [visible2, setVisible2] = useState(false);
    const [farmBatchData, setFarmBatchData] = useState([]);

    const query = useSelector(selectUser);

    useEffect(() => {
      if (query.id && showFarm) getAllBatchData({ userId: query.id });
    }, [query, showFarm]);
    useEffect(() => {
      if (chickenId) {
        getData({ chickenId });
      }
    }, [chickenId]);

    useEffect(() => {
      const timeArrData = [];
      const data = farmBatchData;
      if(data.length === 0) return;
      data.forEach((ele) =>
        ele?.obituaryList?.forEach((item) => {
          if (timeFilter === BatchTimeFilter[0]) {
            if (dayjs(item.dataTime).valueOf() >= startYear) {
              timeArrData.push({ ...item, batchName: ele.batchName });
            }
          }else if(timeFilter === BatchTimeFilter[1]){
            if(dayjs(item.dataTime).valueOf() >= startMonth){
              timeArrData.push({...item, batchName: ele.batchName})
            }
          }else{
            timeArrData.push({...item, batchName: ele.batchName})
          }
        })
      );
      console.log(timeArrData, "timeArrData");

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
              title: visible2 ? "全屏" : "關閉",
              icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
              onclick: (e) => {
                setVisible2(true);
              },
            },
          },
          show: true,
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
          data: timeArrData.sort((a, b) => dayjs(a.dataTime).valueOf() - dayjs(b.dataTime).valueOf()).map((ele) => `${ele.batchName}(${ele.dataTime})`),
          show: false,
        },
        series: [
          {
            name: "淘汰了的",
            type: "bar",
            stack: "Batch",
            emphasis: {
              focus: "series",
            },
            data: timeArrData.map((ele) => ele.eliminateNumber),
          },
          {
            name: "死了的",
            type: "bar",
            stack: "Batch",
            emphasis: {
              focus: "series",
            },
            data: timeArrData.map((ele) => ele.deathNumber),
          },
        ],
      };
      setOption(opt);
    },[timeFilter, farmBatchData])

    const getData = async (params) => {
      let res: Record<string, any> = await fetchPost(
        "/obituary/query_page?page=1&size=3",
        params,
        {
          "Content-Type": "application/json",
        }
      );
      if (res.code === "0") {
        console.log(res, "res");
        const data = res?.data?.[0]?.list || [];
        let obj = data[0]?.obituaryList?.[0] || {};
        const obituaryList = (data[0]?.obituaryList || []).sort((a, b) => dayjs(a.dataTime).valueOf() - dayjs(b.dataTime).valueOf());


        console.log(obj, "obj", data);
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
                title: visible2 ? "全屏" : "關閉",
                icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
                onclick: (e) => {
                  setVisible2(true);
                },
              },
            },
            show: true,
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
            data: obituaryList.map((ele) => ele.dataTime),
            show: false,
          },
          series: [
            {
              name: "淘汰了的",
              type: "bar",
              stack: "Batch",
              emphasis: {
                focus: "series",
              },
              data: obituaryList.map((ele) => ele.eliminateNumber),
            },
            {
              name: "死了的",
              type: "bar",
              stack: "Batch",
              emphasis: {
                focus: "series",
              },
              data: obituaryList.map((ele) => ele.deathNumber),
            },
          ],
        };
        setOption(opt);
      } else {
        setOption({
          title: {
            text: "Depletion rate",
            // show: false,
            textStyle: {
              fontSize: 12,
            },
          },
        });
      }
    };

    //当前农场所有批次折线图
    const getAllBatchData = async (params) => {
      let res: Record<string, any> = await fetchPost(
        "/obituary/query_page?page=1&size=3",
        params,
        {
          "Content-Type": "application/json",
        }
      );
      if (res.code === "0") {
        console.log(res, "getAllBatchData res");
        const data = res?.data?.[0]?.list || [];
        setFarmBatchData(data)
       
      } else {
        setFarmBatchData([])
        setOption({
          title: {
            text: "Depletion rate",
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
  }
);
