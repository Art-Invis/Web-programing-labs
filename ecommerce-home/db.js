const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'songs.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Помилка підключення до БД:", err.message);
  } else {
    console.log("Підключення до SQLite успішне.");
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      title TEXT,
      description TEXT,
      price REAL,
      releaseDate TEXT,
      imageUrl TEXT
    )`, (err) => {
      if (err) {
        console.error("Помилка при створенні таблиці products:", err.message);
      } else {
        console.log("Таблиця products створена або вже існує.");
      }
  });

  db.run(`ALTER TABLE products ADD COLUMN imageUrl TEXT`, (err) => {
    if (err && !err.message.includes("duplicate column")) {
      console.error("Помилка при додаванні стовпця imageUrl:", err.message);
    } else {
      console.log("Стовпець imageUrl додано або вже існує.");
    }
  });
});


const insertProduct = (type, title, description, price, releaseDate, imageUrl) => {
  db.run(
    `INSERT INTO products (type, title, description, price, releaseDate, imageUrl) VALUES (?, ?, ?, ?, ?, ?)`,
    [type, title, description, price, releaseDate, imageUrl],
    (err) => {
      if (err) {
        console.error("Помилка при додаванні продукту:", err.message);
      } else {
        console.log("Продукт додано успішно.");
      }
    }
  );
};

const seedDatabase = () => {
  // Tickets
  insertProduct("tickets", "Coldplay Concert Ticket", "Coldplay live in concert.", 50, "2023-06-12", "/tickets.jpg");
  insertProduct("tickets", "Eminem Concert Ticket", "Experience Eminem live with exclusive concert ticket.", 70, "2023-07-20", "/tickets.jpg");
  insertProduct("tickets", "Twenty One Pilots Concert Ticket", "Catch Twenty One Pilots live in concert.", 60, "2023-10-05", "/tickets.jpg");

  // Merchandise
  insertProduct("merch", "Eminem Hoodie", "Official Eminem Hoodie for fans.", 40, "2023-05-15", "/merch.jpg");
  insertProduct("merch", "Twenty One Pilots Band T-shirt", "Official Twenty One Pilots T-shirt.", 25, "2023-06-10", "/merch.jpg");
  insertProduct("merch", "Linkin Park Cap", "Official Linkin Park cap for fans.", 30, "2023-02-15", "/merch.jpg");

  // Albums
  insertProduct("albums", "Imagine Dragons - Evolve", "The hit album 'Evolve' featuring 'Believer' and 'Thunder'.", 18, "2023-07-20", "/album.jpg");
  insertProduct("albums", "Eminem - The Eminem Show", "Classic Eminem album featuring 'Without Me' and 'Cleanin' Out My Closet'.", 20, "2023-09-12", "/album.jpg");
  insertProduct("albums", "Twenty One Pilots - Blurryface", "Popular album by Twenty One Pilots, featuring 'Stressed Out'.", 18, "2023-06-15", "/album.jpg");

  // Instruments
  insertProduct("instruments", "Fender Electric Guitar", "High-quality Fender electric guitar.", 200, "2023-08-15", "/instruments.jpg");
  insertProduct("instruments", "Yamaha Acoustic Guitar", "Yamaha high-quality acoustic guitar.", 150, "2023-03-15", "/instruments.jpg");

  // Vinyl
  insertProduct("vinyl", "The Beatles - Abbey Road Vinyl", "A classic Beatles' 'Abbey Road' vinyl album.", 100, "2023-10-05", "/vinyl.jpg");
  insertProduct("vinyl", "Pink Floyd - The Wall Vinyl", "Limited edition vinyl of 'The Wall' by Pink Floyd.", 120, "2023-01-22", "/vinyl.jpg");
};


// seedDatabase();

module.exports = db;
