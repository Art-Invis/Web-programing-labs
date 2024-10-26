const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Використовуємо cors та bodyParser для обробки запитів
app.use(cors());
app.use(bodyParser.json());

// Налаштування статичної папки для віддачі статичних файлів (HTML, CSS, JS, зображення)
app.use(express.static(path.join(__dirname)));

// API-маршрути (якщо є)
app.use('/api', require('./routes'));

// Головна сторінка - index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});