
const express = require("express");
const { db, initDatabase } = require("./database");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Promise wrappers for SQLite operations
function dbAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Book Management REST API is running"
    });
});

// GET /books - Search, sort, filter and paginate books
app.get("/books", async (req, res, next) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = req.query;

        // Validate sorting column
        const allowedColumns = ["id", "title", "author", "price"];

        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({
                message: "Invalid order_by. Use id, title, author or price."
            });
        }

        // Validate sorting direction
        const sortOrder = String(order).toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return res.status(400).json({
                message: "Invalid order. Use ASC or DESC."
            });
        }

        // Validate pagination
        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !/^\d+$/.test(String(limit)) ||
            !/^\d+$/.test(String(offset)) ||
            pageLimit < 1 ||
            pageLimit > 100 ||
            pageOffset < 0
        ) {
            return res.status(400).json({
                message: "Limit must be 1-100 and offset must be a non-negative integer."
            });
        }

        // Build parameterized search and filter conditions
        let conditions = [];
        let params = [];

        if (search_q.trim() !== "") {
            conditions.push("title LIKE ?");
            params.push(`%${search_q.trim()}%`);
        }

        if (min_price !== undefined) {
            const min = Number(min_price);

            if (!Number.isFinite(min) || min < 0) {
                return res.status(400).json({
                    message: "min_price must be a non-negative number."
                });
            }

            conditions.push("price >= ?");
            params.push(min);
        }

        if (max_price !== undefined) {
            const max = Number(max_price);

            if (!Number.isFinite(max) || max < 0) {
                return res.status(400).json({
                    message: "max_price must be a non-negative number."
                });
            }

            conditions.push("price <= ?");
            params.push(max);
        }

        if (min_price !== undefined && max_price !== undefined) {
            if (Number(min_price) > Number(max_price)) {
                return res.status(400).json({
                    message: "min_price cannot be greater than max_price."
                });
            }
        }

        const whereClause = conditions.length
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

        // Sorting columns are whitelisted; values are parameterized
        const sql = `
            SELECT * FROM books
            ${whereClause}
            ORDER BY ${order_by} ${sortOrder}
            LIMIT ? OFFSET ?
        `;

        params.push(pageLimit, pageOffset);

        const books = await dbAll(sql, params);

        res.status(200).json({
            message: "Books retrieved successfully",
            count: books.length,
            data: books
        });

    } catch (error) {
        next(error);
    }
});

// GET /books/:id - Get one book
app.get("/books/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid book ID."
            });
        }

        const book = await dbGet(
            "SELECT * FROM books WHERE id = ?",
            [id]
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        res.status(200).json({
            message: "Book retrieved successfully",
            data: book
        });

    } catch (error) {
        next(error);
    }
});

// POST /books - Create a book
app.post("/books", async (req, res, next) => {
    try {
        const { title, author, price } = req.body || {};

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof author !== "string" ||
            author.trim() === "" ||
            price === undefined ||
            price === null ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            return res.status(400).json({
                message: "Valid title, author and non-negative numeric price are required."
            });
        }

        const result = await dbRun(
            "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
            [title.trim(), author.trim(), price]
        );

        const newBook = await dbGet(
            "SELECT * FROM books WHERE id = ?",
            [result.lastID]
        );

        res.status(201).json({
            message: "Book created successfully",
            data: newBook
        });

    } catch (error) {
        next(error);
    }
});

// PUT /books/:id - Update a book
app.put("/books/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { title, author, price } = req.body || {};

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid book ID."
            });
        }

        if (
            typeof title !== "string" ||
            title.trim() === "" ||
            typeof author !== "string" ||
            author.trim() === "" ||
            price === undefined ||
            price === null ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0
        ) {
            return res.status(400).json({
                message: "Valid title, author and non-negative numeric price are required."
            });
        }

        const existingBook = await dbGet(
            "SELECT * FROM books WHERE id = ?",
            [id]
        );

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        await dbRun(
            "UPDATE books SET title = ?, author = ?, price = ? WHERE id = ?",
            [title.trim(), author.trim(), price, id]
        );

        const updatedBook = await dbGet(
            "SELECT * FROM books WHERE id = ?",
            [id]
        );

        res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook
        });

    } catch (error) {
        next(error);
    }
});

// DELETE /books/:id - Delete a book
app.delete("/books/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "Invalid book ID."
            });
        }

        const existingBook = await dbGet(
            "SELECT * FROM books WHERE id = ?",
            [id]
        );

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        await dbRun(
            "DELETE FROM books WHERE id = ?",
            [id]
        );

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        next(error);
    }
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        message: "API endpoint not found."
    });
});

// Handle invalid JSON and other errors
app.use((err, req, res, next) => {
    console.error("Error:", err.message);

    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            message: "Invalid JSON request body."
        });
    }

    res.status(500).json({
        message: "Internal server error."
    });
});

// Initialize database before starting server
initDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to start server:", error.message);
        process.exit(1);
    });
