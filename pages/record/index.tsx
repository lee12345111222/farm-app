import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/header";
import { useRouter } from "next/router";
import { language } from "@/utils/language";
import FooterToolBar from "@/components/footer-tool-bar";
import { Dialog, Dropdown, Radio, Space, Toast } from "antd-mobile";
import {
  MRT_Table, //import alternative sub-component if we do not want toolbars
  type MRT_ColumnDef,
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import { fetchGet, fetchPost } from "@/utils/request";
import { Action } from "antd-mobile/es/components/action-sheet";

const list = [{ name: 123, id: 1 }];

const Record = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;
  const [data, setData] = useState(list);
  const [meta, setMeta] = useState({totalNumber: 0})

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 1, //customize the default page size
  });
  const getShopList = useCallback(
    async (params?: Record<string, any>) => {
      let res = await fetchGet("/order/query_page", {
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        ...params,
      });
      if (res?.code === "0") {
        const data = res.data?.[0] || {};

        console.log(data, "data");

        setData(data.list || []);
        setMeta(data.page)
      }
    },
    [pagination.pageIndex]
  );

  useEffect(() => {
    getShopList()
  },[getShopList])

  const handleDelete = async (commodityId: string) => {
    Dialog.show({
      content: "Are you sure you want to delete it?",
      closeOnAction: true,
      actions: [
        [
          {
            key: "cancel",
            text: "cancel",
          },
          {
            key: "delete",
            text: "delete",
            bold: true,
            danger: true,
          },
        ],
      ],
      onAction: async (action: Action, index: number) => {
        console.log(action, index);
        if (action.key === "delete") {
          let res = await fetchPost(
            "/cart/del_commodity",
            { commodityId },
            {
              "Content-Type": "application/json",
            }
          );
          if (res?.code === "0") {
            console.log(res, "res");
            Toast.show("success");
            getShopList();
          } else {
            Toast.show("Network error");
          }
        }
      },
    });
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //normal accessorKey
        header: "Id",
        size: 30,
      },
      {
        accessorKey: "price", //normal accessorKey
        header: "Price",
        size: 30,
      },
      {
        accessorKey: "status", //normal accessorKey
        header: "Status",
        size: 30,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    // enablePagination: true,
    enableSorting: false,
    enableGlobalFilter: false,
    onPaginationChange: setPagination, //hoist pagination state to your state when it changes internally
    state: { pagination }, //pass the pagination state to the table
    manualPagination: true,
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20],
      showRowsPerPage: false,
      showLastButton: false,
    },
    rowCount: meta?.totalNumber ?? 0,
    // initialState: { pagination: { pageSize: 1, pageIndex: 0 } },
    // mrtTheme: (theme) => ({
    //   baseBackgroundColor: theme.palette.background.default, //change default background color
    // }),
    // muiTableBodyRowProps: { hover: false },
    // muiTableProps: {
    //   sx: {
    //     border: "0.5px solid #eee",
    //     caption: {
    //       captionSide: "top",
    //     },
    //   },
    // },
    // muiTableHeadCellProps: {
    //   sx: {
    //     border: "0.5px solid #eee",
    //     fontStyle: "italic",
    //     fontWeight: "normal",
    //   },
    // },
    // muiTableBodyCellProps: {
    //   sx: {
    //     border: "0.5px solid #eee",
    //   },
    // },
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
          <MaterialReactTable table={table} />
        </div>
        {/* <img src="/news/table.png" className="w-[100%] mt-4" alt="" /> */}
      </div>
      <FooterToolBar />
    </div>
  );
});

export default Record;
