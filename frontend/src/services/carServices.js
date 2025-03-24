const BASE_URL =
  "https://car-data-grid-7f88dc4ca6a7.herokuapp.com" || "http://localhost:5001";

export const fetchCars = async (page, limit) => {
  try {
    const url = `${BASE_URL}/api/cars?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return null;
  }
};

export const searchCars = async (q) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cars/search?q=${q}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching cars:", error);
    return null;
  }
};

export const filterCars = async (column, operator, value) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/cars/filter?column=${column}&operator=${operator}&value=${value}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error filtering cars:", error);
    return null;
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cars/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Failed to delete car:", response.statusText);
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting car:", error);
    return null;
  }
};
