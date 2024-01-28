import React, { memo, useEffect, useMemo, useState } from "react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { Dropdown, Radio, Space } from "antd-mobile";
import {
  MRT_Table, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

const list = [{ name: 123, id: 1 }];

const Record = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [data, setData] = useState(list);

  useEffect(() => {
    setData([{ name: 1, id: 2 }]);
  }, []);
  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //normal accessorKey
        header: "Name",
        size: 100,
      },
      {
        accessorKey: "id", //normal accessorKey
        header: "Id",
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default, //change default background color
    }),
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: "0.5px solid #eee",
        caption: {
          captionSide: "top",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "0.5px solid #eee",
        fontStyle: "italic",
        fontWeight: "normal",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "0.5px solid #eee",
      },
    },
  });

  return (
    <div className="w-full min-h-screen bg-[#F6F9FF] pb-[143px] tablePage">
      <div className="bg-cover h-32">
        <Header logo />
      </div>
      <div className="px-4">
        <Dropdown
          className="rounded-xl"
          style={{
            "--adm-font-size-main": "18px",
            "--adm-color-light": "#000",
          }}
        >
          <Dropdown.Item
            key="sorter"
            title={language[activeLocale || "zh"]?.select}
          >
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue="default">
                <Space direction="vertical" block>
                  <Radio block value="default">
                    综合排序
                  </Radio>
                  <Radio block value="nearest">
                    距离最近
                  </Radio>
                  <Radio block value="top-rated">
                    评分最高
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </Dropdown.Item>
        </Dropdown>
        <div className="rounded-xl mt-4 px-2 py-2 bg-white relative z-0">
          <MRT_Table table={table} />
        </div>
        {/* <img src="/news/table.png" className="w-[100%] mt-4" alt="" /> */}
      </div>
      <FooterToolBar />
    </div>
  );
});

export default Record;
