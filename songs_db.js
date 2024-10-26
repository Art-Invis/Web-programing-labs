// db.js
const sqlite3 = require('sqlite3').verbose();

// Підключення до бази даних
const db = new sqlite3.Database('./songs.db', (err) => {
    if (err) {
        console.error('Error connecting to SQLite database:', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Створення таблиці пісень, якщо вона не існує
db.run(`
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        duration TEXT NOT NULL,
        listens INTEGER NOT NULL,
        songUrl TEXT NOT NULL
    )
`);

module.exports = db;
