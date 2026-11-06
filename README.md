# BDF Lab 3 - REST API, Query Parameters, Validation and Debugging

**Student:** Pratik Jadhav  
**Registration Number:** 252U1R5055  
**Section:** S-10  
**Department:** Artificial Intelligence and Data Engineering  
**University:** Aurora Higher Education and Research Academy  
**Course:** Backend Development Fundamentals  
**Faculty:** Sai Shiva Teja Sir

**GitHub Repository:** [BDF_Lab_3](https://github.com/pratikj0963-droid/BDF_Lab_3)

**Live Link : https://bdf-lab-3-tagk.onrender.com/

## Objective

Convert the Book Management API developed using Node.js and Express.js into a clean REST API with search, sorting, pagination, price filtering, input validation, correct HTTP status codes, and debugging practices.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- npm
- Nodemon
- Postman
- Git and GitHub

## Project Files

- server.js - Express server and REST API routes
- database.js - SQLite database connection, initialization, and sample records
- books.db - SQLite database
- package.json - Project settings and dependencies
- package-lock.json - Dependency lock file
- .gitignore - Excludes generated and sensitive files
- POSTMAN_TEST_CASES.md - API testing list covering success and failure cases
- screenshots/ - API testing and project evidence

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/pratikj0963-droid/BDF_Lab_3.git
cd BDF_Lab_3
npm install
```

## Run the Project

For development using Nodemon:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

Local server: [http://localhost:3001](http://localhost:3001)

No environment variables are required for local execution. The optional PORT variable can override the default port.

## Database

Database: books.db

Table: books

Columns:

- id INTEGER PRIMARY KEY AUTOINCREMENT
- title TEXT NOT NULL
- author TEXT NOT NULL
- price REAL NOT NULL

The database is initialized automatically through database.js before the Express server starts.

Ten initial book records are inserted during database initialization if they do not already exist.

## API Endpoints

| **Method** | **Path** | **Description** | **Expected Status** |
|---|---|---|---|
| GET | /books | Retrieve books with filtering and pagination | 200 |
| GET | /books/:id | Retrieve one book | 200 |
| POST | /books | Add a new book | 201 |
| PUT | /books/:id | Update an existing book | 200 |
| DELETE | /books/:id | Delete a book | 200 |

Unknown books return HTTP 404. Invalid request details return HTTP 400.

## Query Parameters

The GET /books endpoint supports the following query parameters:

- search_q - Search books using partial title matching.
- order_by - Sort records by an allowed column such as id, title, author, or price.
- order - Sort order using ASC or DESC.
- limit - Maximum number of records returned.
- offset - Number of records skipped for pagination.
- min_price - Filter books with a minimum price.
- max_price - Filter books with a maximum price.

Example:

```text
GET /books?search_q=Atomic&order_by=price&order=DESC&limit=5&offset=0
```

## Example POST Body

```json
{
  "title": "Artificial Intelligence Fundamentals",
  "author": "Pratik Jadhav",
  "price": 599
}
```

## SQL Queries

The application uses:

- SELECT - Retrieve book records.
- INSERT - Add a new book.
- UPDATE - Modify an existing book.
- DELETE - Remove a book.
- WHERE and LIKE - Apply search and filtering conditions.
- ORDER BY - Sort book records.
- LIMIT and OFFSET - Implement pagination.

SQL queries accepting user input use ? placeholders to prevent user-supplied values from changing SQL syntax.

## Validation and HTTP Status Codes

- 200 - Successful retrieval, update, or deletion.
- 201 - Book successfully created.
- 400 - Invalid request data, missing required fields, or invalid price.
- 404 - Requested book does not exist.
- 500 - Internal server error.

The API validates book title, author, and price before inserting or updating records.

## Testing Evidence

The API was tested using Postman for successful and unsuccessful requests.

### 1. GET Requests

- Retrieve all books
- Search books by title
- Sort books by price
- Pagination using limit and offset
- Minimum and maximum price filtering
- Combined query filters

### 2. POST Requests

- Create a new book
- Missing title validation
- Missing author validation
- Non-numeric price validation
- Negative price validation

### 3. PUT Requests

- Update an existing book
- Update a nonexistent book
- Invalid price during update

### 4. DELETE and Error Requests

- Delete an existing book
- Delete a nonexistent book
- Retrieve a nonexistent book

Screenshots of API testing are available in the screenshots/ directory.

Refer to POSTMAN_TEST_CASES.md for the complete test-case list.

## Debugging

The lab includes debugging practice for common Node.js and Express.js errors:

- EADDRINUSE - Occurs when another process is using the requested port.
- Incorrect import path - Occurs when a required module cannot be located.
- Table-name mismatch - Occurs when SQL queries reference an incorrect table name.
- Missing await - Can cause asynchronous operations to execute without waiting for their results.

## Notes

- Nodemon restarts the server when source files change.
- Async/await is used for database operations.
- Parameterized SQL queries are used for user inputs.
- The database must initialize before the server starts.
- Search, sorting, pagination, and price filtering are implemented using GET query parameters.
- Request validation is implemented for POST and PUT operations.
- Appropriate HTTP status codes and JSON error responses are returned.
- Postman is used to test successful and unsuccessful API requests.
- node_modules and .env are excluded from Git.

## Result

Implemented a RESTful Book Management API using Node.js, Express.js, and SQLite with search, sorting, pagination, price filtering, validation, CRUD operations, and appropriate HTTP status codes.

The project includes its SQLite database, sample records, source code, testing documentation, and API testing screenshots.

## Conclusion

This project demonstrates REST API development using Node.js and Express.js, including database integration, query parameters, search, sorting, pagination, input validation, parameterized SQL queries, HTTP status codes, error handling, and debugging practices.

---

**Developed by Pratik Jadhav**  
**Registration Number: 252U1R5055**  
<<<<<<< Updated upstream
**Section: S-10**
=======
**Section: S-10**
>>>>>>> Stashed changes
