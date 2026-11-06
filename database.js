const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or connect to the database
const dbPath = path.join(__dirname, "books.db");
const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

// Create books table and insert sample records
async function initDatabase() {
    try {
        await run(`
            CREATE TABLE IF NOT EXISTS books (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                author TEXT NOT NULL,
                price REAL NOT NULL
            )
        `);

        const books = [
            ["The Alchemist", "Paulo Coelho", 299],
            ["Atomic Habits", "James Clear", 450],
            ["Rich Dad Poor Dad", "Robert Kiyosaki", 350],
            ["Wings of Fire", "A.P.J. Abdul Kalam", 250],
            ["The Psychology of Money", "Morgan Housel", 399],
            ["Deep Work", "Cal Newport", 320],
            ["Think and Grow Rich", "Napoleon Hill", 280],
            ["Ikigai", "Hector Garcia", 199],
            ["Zero to One", "Peter Thiel", 420],
            ["The Power of Now", "Eckhart Tolle", 310]
        ];

        for (const book of books) {
            await run(
                `INSERT INTO books (title, author, price)
                 SELECT ?, ?, ?
                 WHERE NOT EXISTS (
                     SELECT 1 FROM books WHERE title = ? AND author = ?
                 )`,
                [...book, book[0], book[1]]
            );
        }

        console.log("Database initialized successfully!");
    } catch (error) {
        console.error("Database initialization failed:", error.message);
        throw error;
    }
}

module.exports = { db, initDatabase };