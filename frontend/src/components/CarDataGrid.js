import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import DataGridToolbar from './DataGridToolbar';
import ConfirmDeleteDialog from './DataGridDialog';
import {fetchCars, searchCars, filterCars, deleteCar} from '../services/carServices';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const CarDataGrid = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const gridApiRef = useRef(null);

  // toolbar state
  const [search, setSearch]           = useState('');
  const [filterColumn, setFilterColumn]   = useState('');
  const [filterOperator, setFilterOperator] = useState('');
  const [filterValue, setFilterValue]     = useState('');

  // delete-dialog state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId]                 = useState(null);

  // load data on mount
  useEffect(() => {
    (async () => {
      const res = await fetchCars();
      if (res?.data) setCars(res.data);
      else console.error('Failed to load cars');
    })();
  }, []);

  // Search handler
  const handleSearch = async () => {
    const res = await searchCars(search);
    if (res?.data) setCars(res.data);
  };

  // Filter handler
  const handleFilter = async () => {
    const res = await filterCars(filterColumn, filterOperator, filterValue);
    if (res?.data) setCars(res.data);
  };

  // Reset search & filter
  const handleReset = () => {
    setSearch('');
    setFilterColumn('');
    setFilterOperator('');
    setFilterValue('');
    fetchCars().then(res => res?.data && setCars(res.data));
    gridApiRef.current?.setFilterModel(null);
  };

  // Export CSV
  const handleExport = () => {
    gridApiRef.current?.exportDataAsCsv({ fileName: 'cars_export.csv' });
  };

  // Delete flow
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };
  const confirmDelete = async () => {
    await deleteCar(deleteId);
    setCars(prev => prev.filter(c => c._id !== deleteId));
    setOpenDeleteDialog(false);
  };
  const cancelDelete = () => setOpenDeleteDialog(false);

  // View details
  const handleView = (id) => navigate(`/details/${id}`);

  // Grid ready
  const onGridReady = (params) => {
    gridApiRef.current = params.api;
    if (params.columnApi?.autoSizeAllColumns) {
      params.columnApi.autoSizeAllColumns();
    }
  };

  // Column definitions
  const columnDefs = [
    { field: 'Brand',        headerName: 'Brand', width: 150 },
    { field: 'Model',        headerName: 'Model', width: 200 },
    { field: 'TopSpeed_KmH', headerName: 'Top Speed', width: 120 },
    { field: 'Range_Km',     headerName: 'Range (Km)', width: 120 },
    { field: 'Efficiency_WhKm', headerName: 'Efficiency (Wh/Km)', width: 140 },
    //{ field: 'FastCharge_kmH',  headerName: 'Fast Charge (km/h)', width: 140 },
    { field: 'PowerTrain',   headerName: 'Power Train', width: 120 },
    { field: 'PlugType',     headerName: 'Plug Type', width: 120 },
    { field: 'BodyStyle',    headerName: 'Body Style', width: 120 },
    { field: 'Segment',      headerName: 'Segment', width: 100 },
    { field: 'Seats',        headerName: 'Seats', width:  80 },
    { field: 'PriceEuro',    headerName: 'Price (€)', width: 120 },
    {
      headerName: 'Actions',
      width: 140,
      cellRenderer: params => (
        <div style={{ display: 'flex', gap: 4 }}>
          <Button
            size="small"
            variant="contained"
            sx={{ minWidth: 36, padding: '2px 6px', fontSize: '0.7rem' }}
            onClick={() => handleView(params.data._id)}
          >
            View
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            sx={{ minWidth: 36, padding: '2px 6px', fontSize: '0.7rem' }}
            onClick={() => handleDeleteConfirmation(params.data._id)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];

  const defaultColDef = {
    sortable: true,
    filter:   true,
    resizable:true,
    floatingFilter: true
  };

  return (
    <Box p={2}>
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

      <div
        className="ag-theme-alpine"
        style={{ height: 500, width: '100%', marginTop: 16 }}
      >
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={25}
          paginationPageSizeSelector={[25, 50, 100]}
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
