import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import AgGrid from "./AgGrid";
import { fetchCars, searchCars, filterCars, deleteCar } from "../services/carServices";
import DataGridToolbar from "./DataGridToolbar";
import ConfirmDeleteDialog from "./DataGridDialog";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

const CarDataGrid = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  
  // AG Grid APIs
  const gridApiRef = useRef(null);
  const columnApiRef = useRef(null);

  // Search/Filter states
  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOperator, setFilterOperator] = useState("");

  // Delete Confirmation Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadCars = async () => {
    const response = await fetchCars(1, 10);
    if (response && Array.isArray(response.data)) {
      setCars(response.data);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleSearch = async () => {
    const data = await searchCars(search);
    if (data) {
      setCars(data.data);
      if (gridApiRef.current) {
        gridApiRef.current.setRowData(data.data);
      }
    }
  };

  const handleFilter = async () => {
    const data = await filterCars(filterColumn, filterOperator, filterValue);
    if (data) {
      setCars(data.data);
      if (gridApiRef.current) {
        gridApiRef.current.setRowData(data.data);
      }
    }
  };

  const handleReset = () => {
    setSearch("");
    setFilterColumn("");
    setFilterValue("");
    setFilterOperator("");
    loadCars();
    if (gridApiRef.current) {
      gridApiRef.current.setFilterModel(null);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    const result = await deleteCar(deleteId);
    if (result) {
      setCars((prev) => prev.filter((car) => car._id !== deleteId));
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleView = (id) => {
    navigate(`/details/${id}`);
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    columnApiRef.current = params.columnApi;
    params.columnApi.autoSizeAllColumns();
  };

  const handleExport = () => {
    if (gridApiRef.current) {
      gridApiRef.current.exportDataAsCsv({
        fileName: 'cars_export.csv',
        processCellCallback: (params) => {
          return params.value;
        }
      });
    }
  };

  const columnDefs = [
    { field: "Brand", headerName: "Brand", width: 150 },
    { field: "Model", headerName: "Model", width: 200 },
    { field: "TopSpeed_KmH", headerName: "Top Speed (KmH)", width: 150 },
    { field: "Range_Km", headerName: "Range (Km)", width: 100 },
    { field: "PowerTrain", headerName: "Power Train", width: 100 },
    { field: "PlugType", headerName: "Plug Type", width: 100 },
    { field: "BodyStyle", headerName: "Body Style", width: 100 },
    { field: "Segment", headerName: "Segment", width: 100 },
    { field: "Seats", headerName: "Seats", width: 100 },
    { field: "PriceEuro", headerName: "Price (€)", width: 100 },
    {
      headerName: "Actions",
      field: "actions",
      width: 180,
      cellRendererFramework: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: "0.8rem",
              padding: "2px 4px",
              minWidth: "60px",
              fontWeight: "bold",
            }}
            onClick={() => handleView(params.data._id)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              fontSize: "0.8rem",
              padding: "2px 4px",
              minWidth: "60px",
              fontWeight: "bold",
            }}
            onClick={() => handleDeleteConfirmation(params.data._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      height="100vh"
      padding="20px"
      gap="20px"
    >
      <DataGridToolbar
        search={search}
        setSearch={setSearch}
        filterColumn={filterColumn}
        setFilterColumn={setFilterColumn}
        filterOperator={filterOperator}
        setFilterOperator={setFilterOperator}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        handleReset={handleReset}
        handleExport={handleExport}
      />

      <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
        <AgGrid
          modules={[ClientSideRowModelModule]}
          rowModelType="clientSide"
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
      
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        handleClose={cancelDelete}
        handleConfirm={confirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this record?"
      />
    </Box>
  );
};

export default CarDataGrid;
