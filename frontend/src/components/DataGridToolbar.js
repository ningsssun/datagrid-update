import React from "react";
import { Box, TextField, Button, MenuItem, Paper } from "@mui/material";

const DataGridToolbar = ({
  search,
  setSearch,
  filterColumn,
  setFilterColumn,
  filterOperator,
  setFilterOperator,
  filterValue,
  setFilterValue,
  handleSearch,
  handleFilter,
  handleReset,
}) => {
  return (
    <Box
      width="95%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap="20px"
    >
      {/* Search */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
            fontWeight: "bold",
          }}
        >
          Search
        </Button>
      </Paper>
      {/* Filter */}
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
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
            fontWeight: "bold",
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
            fontWeight: "bold",
          }}
        >
          Reset
        </Button>
      </Paper>
    </Box>
  );
};

export default DataGridToolbar;
