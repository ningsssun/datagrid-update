import React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

const AGGrid = ({ rowData, columnDefs, defaultColDef, onGridReady, modules, rowModelType }) => {
  return (
    <div style={{ height: "42rem", width: "100%" }}>
      <AgGridReact
        modules={modules}
        rowModelType={rowModelType}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        suppressCellFocus={true}
        pagination={true}
        paginationPageSize={25}
        paginationPageSizeSelector={[25, 50, 100]}
      />
    </div>
  );
};

export default AGGrid;
