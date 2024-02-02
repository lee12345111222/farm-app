import React, { memo } from "react";
import Header from "@/components/header";

import { useRouter } from "next/router";
import { language } from "@/utils/language";
import CalendarPicker from "@/components/calendarPicker";
import InputList from "@/components/inputList";
import CalendarDown from "@/components/calendarDown";

const News = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const list = [
    { name: language[activeLocale || "zh"]?.immunizationdate },
    { name: language[activeLocale || "zh"]?.vaccinename },
    { name: language[activeLocale || "zh"]?.vaccinestrains },
    { name: language[activeLocale || "zh"]?.vaccinestype },
    { name: language[activeLocale || "zh"]?.vaccinesage },
    { name: language[activeLocale || "zh"]?.vaccinationsnums },
    { name: language[activeLocale || "zh"]?.administered },
    { name: language[activeLocale || "zh"]?.vaccinesroute },
    { name: language[activeLocale || "zh"]?.manufacturers },
    { name: language[activeLocale || "zh"]?.vaccinewhere },
  ];

  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative">
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.immunity}
          styles="top-10"
        />
      </div>
      <div className="mx-3  mt-2">
        <CalendarDown />
      </div>

      <div className="mx-3 px-5 bg-white overflow-hidden rounded-lg">
        <InputList list={list} />
      </div>
    </div>
  );
});

export default News;
