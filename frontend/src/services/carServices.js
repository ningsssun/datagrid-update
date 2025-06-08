const BASE_URL = "http://localhost:5001";

export const fetchCars = async (page, limit) => {
  try {
    const url = `${BASE_URL}/api/cars`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return null;
  }
};

export const fetchCarById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/cars/${id}`);
  if (!res.ok) {
    console.error('Error fetching car:', res.statusText);
    return null;
  }
  return await res.json(); 
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
