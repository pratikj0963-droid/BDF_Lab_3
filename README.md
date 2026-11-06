# BDF Lab 3 – REST API, Query Parameters, Validation and Debugging

## Project Overview
This project implements a RESTful Book Management API using Node.js, Express.js and SQLite.

It supports CRUD operations, searching, sorting, pagination, price filtering, request validation and appropriate HTTP status codes.

## Technologies Used
- Node.js
- Express.js
- SQLite
- JavaScript

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd BDF_lab_3
npm install
```

## Run the Application

```bash
npm start
```

Development mode:

```bash
npm run dev
```

The API runs at:

`http://localhost:3001`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Create a book |
| PUT | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |

## GET Query Parameters

- `search_q` – Search by partial book title.
- `order_by` – Sort by an allowed field.
- `order` – ASC or DESC.
- `limit` – Maximum number of records.
- `offset` – Pagination offset.
- `min_price` – Minimum price filter.
- `max_price` – Maximum price filter.

Example:

`GET /books?search_q=Atomic&order_by=price&order=DESC&limit=5&offset=0`

## Validation and HTTP Status Codes

- `200` – Successful retrieval, update or deletion.
- `201` – Book successfully created.
- `400` – Invalid request data.
- `404` – Requested book does not exist.
- `500` – Internal server error.

## Testing

The API was tested using Postman for successful and unsuccessful requests, including CRUD operations, search, sorting, pagination, price filtering and validation.

See `POSTMAN_TEST_CASES.md` and the `screenshots` folder for testing evidence.

## Academic Information

Backend Development Fundamentals – Lab 3  
Year II, Term II  
Aurora Higher Education and Research Academy
