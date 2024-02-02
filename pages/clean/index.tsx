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
    { name: language[activeLocale || "zh"]?.clearingdate },
    { name: language[activeLocale || "zh"]?.cleantype },
    { name: language[activeLocale || "zh"]?.rodenticidestype },
    { name: language[activeLocale || "zh"]?.endoparasitic },
    { name: language[activeLocale || "zh"]?.exoparasitic },
    { name: language[activeLocale || "zh"]?.insecticide },
  ];

  return (
    <div className="w-full h-screen bg-white pb-6 overflow-auto relative">
      <div className="bg-cover h-24">
        <Header
          back
          title={language[activeLocale || "zh"]?.clean}
          styles="top-10"
        />
      </div>
      <div className="mx-3  mt-2">
        <CalendarDown />
      </div>
      <div className="mx-3 px-5 bg-white overflow-hidden rounded-lg">
      <InputList list ={list} />

        {/*  */}
      </div>
    </div>
  );
});

export default News;
