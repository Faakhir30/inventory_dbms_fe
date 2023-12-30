import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: string[];
  rows: object[];
  slug: string;
  handleEdit:any
  handleDelete: any
};

const DataTable = (props: Props) => {
  const columns: GridColDef[] = props.columns.map((col: any) => {
    return typeof col === "string"
      ? {
          field: col,
          headerName: col,
          type: col || "string",
          width: 90,
        }
      : {
          field: col.name,
          headerName: col.name,
          type: col.name || "string",
          width: col.width || 90,
        };
  });

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete" onClick={() => props.handleEdit(params.row.id)}>
            <img src="/view.svg" alt="" />
          </div>
          <div className="delete" onClick={() => props.handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };
  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
