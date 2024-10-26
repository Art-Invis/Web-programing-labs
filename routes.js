const express = require('express');
const router = express.Router();
const db = require('./songs_db'); // Імпорт модуля бази даних

router.get('/songs', (req, res) => {
    const { search = '', sortBy, order = 'asc' } = req.query;

    // Логування параметрів пошуку та сортування
    console.log(`Search query: "${search}", Sort by: "${sortBy}", Order: "${order}"`);

    // Основний SQL-запит для пошуку пісень за назвою або автором
    let query = 'SELECT * FROM songs WHERE title LIKE ? OR author LIKE ?';
    const params = [`%${search}%`, `%${search}%`]; // Формуємо параметри пошуку

    // Додаємо сортування до SQL-запиту
    if (sortBy === 'Popularity') {
        query += ` ORDER BY listens ${order.toUpperCase()}`;
    } else if (sortBy === 'A-Z') {
        query += ` ORDER BY title ${order.toUpperCase()}`;
    } else if (sortBy === 'duration') {
        query += ` ORDER BY duration ${order.toUpperCase()}`;
    }

    // Логування SQL-запиту та параметрів
    console.log('Executing SQL query:', query, params);

    // Виконання запиту до бази даних
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ message: 'Error fetching songs' });
        }

        // Логування знайдених пісень після пошуку та сортування
        // console.log('Search and sorted results:', rows);

        // Відправлення знайдених пісень на клієнт
        res.json(rows); // Повертаємо лише пісні, які відповідають пошуковому запиту
    });
});



// Читати всі пісні
router.get('/songs', (req, res) => {
    db.all('SELECT * FROM songs', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching songs' });
        }
        res.json(rows);
    });
});


router.get('/songs/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ID пісні: ${id}`);
    db.get('SELECT * FROM songs WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Помилка бази даних:', err);
            return res.status(500).json({ message: 'Помилка отримання пісні' });
        }
        if (!row) {
            return res.status(404).json({ message: 'Пісня не знайдена' });
        }
        res.json(row);
    });
});



// Створити нову пісню
router.post('/songs', (req, res) => {
    const { title, author, duration, listens, songUrl } = req.body;
    db.run('INSERT INTO songs (title, author, duration, listens, songUrl) VALUES (?, ?, ?, ?, ?)', 
    [title, author, duration, listens, songUrl], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error creating song' });
        }
        res.status(201).json({ id: this.lastID, title, author, duration, listens, songUrl });
    });
});

// Оновити пісню за id
router.put('/songs/:id', (req, res) => {
    
    const { title, author, duration, listens, songUrl } = req.body;
    const id = req.params.id;
    db.run('UPDATE songs SET title = ?, author = ?, duration = ?, listens = ?, songUrl = ? WHERE id = ?', 
    [title, author, duration, listens, songUrl, id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error updating song' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json({ id, title, author, duration, listens, songUrl });
    });
});

// Видалити пісню за id
router.delete('/songs/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM songs WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Error deleting song' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(204).send();
    });
});


module.exports = router;