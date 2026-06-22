# Employee Management Dashboard - Backend

A scalable RESTful API backend built with Node.js, Express.js, MongoDB, and Mongoose for managing employee records, authentication, search, filtering, pagination, and API documentation using Swagger.


## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local installation or MongoDB Atlas account)

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure MongoDB connection in `.env`:

   **Option 1: Local MongoDB**
   ```env
   MONGODB_URI=mongodb://localhost:27017/employee_management
   ```

   **Option 2: MongoDB Atlas (Cloud)**
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/employee_management
   ```

### Database Seeding

Before running the server for the first time, seed the database with sample data:

```bash
# Seed database (adds data if empty)
npm run seed

# Reset and seed database (clears existing data first)
npm run seed:clear
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on **http://localhost:5000**

## API Documentation

**Interactive API documentation is available via Swagger UI:**

**Swagger Docs:** http://localhost:5000/api-docs

Visit this URL in your browser after starting the server to explore all API endpoints with:
- Detailed request/response schemas
- Example requests and responses
- "Try it out" functionality to test endpoints directly
- Complete parameter descriptions

You can also access the raw OpenAPI spec at: http://localhost:5000/api-docs.json

## Project Structure

- `src/` - Source code
  - `server.js` - Main server entry point
  - `swagger.js` - Swagger/OpenAPI configuration
  - `config/database.js` - MongoDB connection configuration
  - `models/` - Mongoose models (Employee, User)
  - `controllers/` - Request handlers
  - `routes/` - API routes (with Swagger annotations)
  - `middleware/` - Express middleware
  - `scripts/` - Database seed scripts
  - `utils/` - Utility functions

## API Endpoints

### Authentication

**POST** `/api/auth/login`
- Login with credentials
- Body: `{ email, password }`
- Response: User data with token

### Employees

**GET** `/api/employees`
- Get all employees with filters, search, pagination, and sorting
- Query params:
  - `search` - Search by name, email, role, department
  - `department` - Filter by department
  - `status` - Filter by status (active/inactive)
  - `page` - Page number (default: 1)
  - `limit` - Items per page (default: 10)
  - `sortBy` - Sort field (default: name)
  - `order` - Sort order: asc/desc (default: asc)

**GET** `/api/employees/:id`
- Get employee by ID
- Returns 404 if not found

**POST** `/api/employees`
- Create new employee
- Body: `{ name, email, phone, department, role, joiningDate, salary, address, status }`
- Validates duplicate email

**PUT** `/api/employees/:id`
- Update employee
- Body: Employee fields to update
- Validates duplicate email

**PATCH** `/api/employees/:id/status`
- Update employee status
- Body: `{ status: 'active' | 'inactive' }`

**DELETE** `/api/employees/:id`
- Delete employee
- Returns 404 if not found

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... },
  "pagination": { ... }
}
```

## Login Credentials

Use these credentials for testing login:

- **Email:** admin@example.com
- **Password:** admin123

## Features

## Features

* Employee CRUD Operations
* Employee Search & Filtering
* Pagination & Sorting
* MongoDB Integration with Mongoose
* Swagger API Documentation
* Database Seeding Support
* Email Duplicate Validation
* Error Handling & Validation
* CORS Enabled for Frontend Integration
* RESTful API Architecture
  

## Quick Commands

```bash
# Install dependencies
npm install

# Create .env from example
cp .env.example .env

# Seed database
npm run seed

# Reset and seed database
npm run seed:clear

# Start development server
npm run dev

# Start production server
npm start
```
