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
import { DeleteOutline, EyeOutline } from "antd-mobile-icons";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectUser, useSelector } from "@/lib/redux";
import dayjs from "dayjs";

const list = [{ farmName: "", id: "" }];

const Status = {
  未付款: 1,
  已付款: 2,
  已发货: 3,
  已收货: 4,
  订单正常完成: 20,
};

const Record = memo(() => {
  const router = useRouter();
  const { locale: activeLocale } = router;

  const query = useSelector(selectUser);

  const [data, setData] = useState(list);
  const [meta, setMeta] = useState({ totalNumber: 0 });

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //customize the default page size
  });
  const getShopList = useCallback(
    async (params?: Record<string, any>) => {
      let res: Record<string, any> = await fetchPost(
        `/chicken/query_all?page=${
          pagination.pageIndex + 1
        }&size=${pagination.pageSize}`,
        {
          ...params,
        },
        {
          "Content-Type": "application/json",
        }
      );
      if (res?.code === "0") {
        let data: Record<string, any> = res.data?.[0] || {};

        console.log(data, "data");
        data.list = data.list?.map((item: Record<string, any>) => {
          let len = item.farmOtherAttributes?.length;
          len = len > 0 ? len - 1 : 0;
          item = {
            ...item,
            ...item.farmOtherAttributes?.[len],
          };
          return item;
        });

        setData(data.list || []);
        setMeta(data.page);
      }
    },
    [pagination.pageIndex]
  );

  useEffect(() => {
    getShopList();
  }, [getShopList]);

  const handleDelete = async (row: Record<string, any>) => {
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
          let res = await fetchGet("/order/delete/" + row?.original?.id, {});
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
      // {
      //   accessorKey: "id", //normal accessorKey
      //   header: "Id",
      //   size: 30,
      //   enableEditing: false,
      // },
      {
        accessorKey: "farmName", //normal accessorKey
        header: "FarmName",
        size: 30,
        enableEditing: false,
      },
      {
        accessorKey: "sensitive", //normal accessorKey
        header: "Sensitive",
        size: 30,
      },
      {
        accessorKey: "intermediate", //normal accessorKey
        header: "Intermediate",
        size: 30,
      },
      {
        accessorKey: "resistant", //normal accessorKey
        header: "Resistant",
        size: 30,
      },
    ],
    []
  );

  //UPDATE action
  const handleSave = async ({ row, values, table }: any) => {
    console.log(row, 'row')
    const {
      farmId = row.original.farmId || row.original.id,
      dataTime = dayjs().format("YYYY-MM-DD"),
      sensitive,
      intermediate,
      resistant,
    } = values;
    console.log(
      { farmId, dataTime, sensitive, intermediate, resistant },
      "values"
    );

    let res = await fetchPost(
      `/farmOtherAttributes/add`,
      { farmId, dataTime, sensitive, intermediate, resistant },
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
    table.setEditingRow(null); //exit editing mode
  };

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
    enableEditing: query.admin === "1" ? true : false,
    editDisplayMode: "modal",
    onEditingRowSave: handleSave,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip> */}
      </Box>
    ),
    positionActionsColumn: "last",
  });

  return (
    <div className="w-full min-h-screen bg-[#F6F9FF] pb-[143px] tablePage">
      <div className="bg-cover h-32">
        <Header logo />
      </div>
      <div className="px-4">
        {/*  */}
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
