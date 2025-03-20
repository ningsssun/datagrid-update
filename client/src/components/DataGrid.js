import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, MenuItem, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const CarDataGrid = () => {
  // Data/Pagination states
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // Search/Filter states
  const [search, setSearch] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOperator, setFilterOperator] = useState("");

  // Delete Confirmation Dialog states
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch cars from backend
  const fetchCars = async () => {
    try {
      const url = `http://localhost:5001/api/cars?page=${page}&limit=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      setCars(data.data);
      setTotalRows(data.total);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  // Handle search
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/cars/search?q=${search}`);
      const data = await response.json();
      setCars(data.data);
    } catch (error) {
      console.error("Error searching cars:", error);
    }
  };

  // Handle filter
  const handleFilter = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/cars/filter?column=${filterColumn}&operator=${filterOperator}&value=${filterValue}`
      );
      const data = await response.json();
      setCars(data.data);
    } catch (error) {
      console.error("Error filtering cars:", error);
    }
  };

  // Reset search/filter
  const handleReset = () => {
    setSearch("");
    setFilterColumn("");
    setFilterValue("");
    setFilterOperator("");
    setPage(1);
    setPageSize(10);
    fetchCars();
  };

  // Handle Delete records
  const handleDeleteConfirmation = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/cars/${deleteId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCars((prev) => prev.filter((car) => car._id !== deleteId));
      } else {
        console.error("Failed to delete car:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
    setOpenDeleteDialog(false);
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
  };
  
  // Navigate to details page
  const handleView = (id) => {
    navigate(`/details/${id}`);
  };

  // DataGrid columns
  const columns = [
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
      field: "actions",
      headerName: "Actions",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ 
              marginRight: 1,
              fontSize: "0.8rem",
              padding: "2px 4px",
              minWidth: "60px",
              border: "1px", 
              fontWeight: "bold" 
            }}
            onClick={() => handleView(params.row._id)}
          >
            View
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteConfirmation(params.row._id)}
            sx={{ 
              fontSize: "0.8rem",
              padding: "2px 4px",
              minWidth: "60px",
              border: "1px", 
              fontWeight: "bold" 
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

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
      {/* Search & Filter & Reset Section */}
      <Box width="95%" display="flex" justifyContent="center" alignItems="center" gap="20px">
        {/* Search */}
        <Paper elevation={3} sx={{ padding: 2, display: "flex", alignItems: "center", gap: "10px" }}>
          <TextField
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            sx={{ 
              backgroundColor: "#1976D2",
              color: "white",
              "&:hover": { backgroundColor: "#1565C0" },
              fontSize: "0.9rem",  
              padding: "8px 16px",  
              fontWeight: "bold" 
            }}
          >
            Search
          </Button>
        </Paper>

        {/* Filter */}
        <Paper elevation={3} sx={{ padding: 2, display: "flex", alignItems: "center", gap: "10px" }}>
          <TextField
            select
            label="Column"
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="Brand">Brand</MenuItem>
            <MenuItem value="Model">Model</MenuItem>
            <MenuItem value="TopSpeed_KmH">Top Speed</MenuItem>
            <MenuItem value="Range_Km">Range</MenuItem>
            <MenuItem value="PowerTrain">Power Train</MenuItem>
            <MenuItem value="PlugType">Plug Type</MenuItem>
            <MenuItem value="BodyStyle">Body Style</MenuItem>
            <MenuItem value="Segment">Segment</MenuItem>
            <MenuItem value="Seats">Seats</MenuItem>
            <MenuItem value="PriceEuro">Price</MenuItem>
          </TextField>

          <TextField
            select
            label="Operator"
            value={filterOperator}
            onChange={(e) => setFilterOperator(e.target.value)}
            sx={{ width: 150 }}
          >
            <MenuItem value="contains">Contains</MenuItem>
            <MenuItem value="equals">Equals</MenuItem>
            <MenuItem value="starts_with">Starts With</MenuItem>
            <MenuItem value="ends_with">Ends With</MenuItem>
            <MenuItem value="is_empty">Is Empty</MenuItem>
          </TextField>

          <TextField
            label="Value"
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />

          <Button 
            variant="contained" 
            onClick={handleFilter}
            sx={{ 
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#388E3C" },
              fontSize: "0.9rem",  
              padding: "8px 16px",  
              fontWeight: "bold" 
            }}
          >
            Filter
          </Button>
        </Paper>

        {/* Reset */}
        <Paper 
          elevation={3} 
          sx={{ 
            padding: 2, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            minWidth: "90px",
            height: "56px",
          }}
        >
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleReset} 
            sx={{ 
              fontSize: "0.9rem",
              padding: "6px 12px",
              minWidth: "80px",
              border: "1.5px solid #d32f2f", 
              fontWeight: "bold" 
            }}
          >
            Reset
          </Button>
        </Paper>
      </Box>

      {/* DataGrid */}
      <Paper elevation={3} sx={{ height: 570, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={cars}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Paper>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} variant="outlined">
            No
          </Button>
          <Button onClick={confirmDelete} variant="outlined" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarDataGrid;
