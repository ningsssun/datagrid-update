const express = require("express");
const router = express.Router();
const carsController = require("../controller/carsController");

// Route to get all cars with pagination
router.get(
  "/",
  carsController.getAllCars
);

// Route to search cars by keyword across all text fields
router.get(
  "/search",
  carsController.searchCars
);

// Route to filter cars by column-specific criteria
router.get(
  "/filter",
  carsController.filterCars
);

// Route to get details of a specific car by ID
router.get(
  "/:id",
  carsController.getCar
);

// Route to delete details of a specific car by ID
router.delete(
  "/delete",
  carsController.deletetCar
);

module.exports = router;
