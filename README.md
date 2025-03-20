# BMW IT Internship DataGrid Project

This project is part of a BMW IT Internship test. It demonstrates a generic data grid built with React and Material UI that integrates with an Express backend and MongoDB. The application features server-side pagination, search, filtering, and actions such as view and delete for car records. It also includes a details page that displays all fields from a selected car.

---

## Features

- **Generic DataGrid**: Dynamically displays data with configurable columns.
- **Server-Side Pagination**: Loads data in pages from the backend.
- **Search & Filter**: Search by text and filter by specific columns.
- **Actions Column**: Includes "View" and "Delete" actions.
  - **View**: Navigates to a detailed view page for a selected record.
  - **Delete**: Confirms deletion and removes the record from the database.
- **Responsive Design**: Styled with Material UI components.
- **Car Details Page**: Displays complete information of a selected car.

---

## Tech Stack

- **Frontend**: React, Material UI, React Router, MUI DataGrid
- **Backend**: Node.js, Express, MongoDB, Mongoose

---

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)
- MongoDB (local instance or MongoDB Atlas)

---

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
