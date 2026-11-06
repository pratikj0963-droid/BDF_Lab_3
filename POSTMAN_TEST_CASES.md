# BDF Lab 3 – Postman Test Cases

Base URL: `http://localhost:3001`

## 1. GET Requests

| Test | Request | Expected result |
|---|---|---|
| Get all books | GET `/books` | 200 |
| Search books | GET `/books?search_q=Atomic` | 200 |
| Sort by price | GET `/books?order_by=price&order=DESC` | 200 |
| Pagination | GET `/books?limit=5&offset=0` | 200 |
| Price filter | GET `/books?min_price=100&max_price=400` | 200 |
| Combined filters | GET `/books?search_q=The&order_by=price&order=ASC&limit=5&offset=0` | 200 |

## 2. POST Requests

| Test | Request | Expected result |
|---|---|---|
| Create book | POST `/books` with valid data | 201 |
| Missing title | POST `/books` without title | 400 |
| Missing author | POST `/books` without author | 400 |
| Non-numeric price | POST `/books` with invalid price | 400 |
| Negative price | POST `/books` with negative price | 400 |

## 3. PUT Requests

| Test | Request | Expected result |
|---|---|---|
| Update existing book | PUT `/books/:id` | 200 |
| Update nonexistent book | PUT `/books/:id` with missing ID | 404 |
| Invalid update price | PUT `/books/:id` with invalid price | 400 |

## 4. DELETE and Error Requests

| Test | Request | Expected result |
|---|---|---|
| Delete existing book | DELETE `/books/:id` | 200 |
| Delete nonexistent book | DELETE `/books/:id` with missing ID | 404 |
| Get nonexistent book | GET `/books/:id` with missing ID | 404 |

## Testing Evidence

Screenshots of the successful and unsuccessful API tests are available in the `screenshots/` directory.

All listed tests were executed during the lab testing process.