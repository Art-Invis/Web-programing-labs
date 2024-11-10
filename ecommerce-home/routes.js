const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/items', (req, res) => {
  const { type, search, sort, order } = req.query;
  let query = `SELECT * FROM products`;
  const params = [];

  if (type) {
    query += ` WHERE type = ?`;
    params.push(type);
  }

  if (search) {
    query += type ? ` AND title LIKE ?` : ` WHERE title LIKE ?`;
    params.push(`%${search}%`);
  }

  if (sort) {
    const orderDirection = order === 'desc' ? 'DESC' : 'ASC';
    if (sort === 'price') {
      query += ` ORDER BY price ${orderDirection}`;
    } else if (sort === 'alphabet') {
      query += ` ORDER BY title ${orderDirection}`;
    } else if (sort === 'releaseDate') {
      query += ` ORDER BY releaseDate ${orderDirection}`;
    }
  }


  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Помилка отримання продуктів з бази даних" });
    } else {
      res.json(rows);
    }
  });
});

router.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';

  db.get(sql, [id], (err, row) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      if (!row) {
          return res.status(404).json({ error: 'Product not found' });
      }

      const selectableOptions = getSelectableOptions(row.type);
      res.json({ ...row, selectableOptions });
  });
});

const getSelectableOptions = (type) => {
  switch (type) {
    case 'tickets': return [{ label: 'Standard', value: 'standard' }, { label: 'VIP', value: 'vip' }, { label: 'Student', value: 'student' }];
    case 'merch': return [{ label: 'Small (S)', value: 'small' }, { label: 'Medium (M)', value: 'medium' }, { label: 'Large (L)', value: 'large' }, { label: 'Extra Large (XL)', value: 'xl' }];
    case 'albums': return [{ label: 'CD', value: 'cd' }, { label: 'Vinyl', value: 'vinyl' }, { label: 'Digital', value: 'digital' }];
    case 'instruments': return [{ label: 'Acoustic', value: 'acoustic' }, { label: 'Electric', value: 'electric' }];
    case 'vinyl': return [{ label: 'Standard Edition', value: 'standard' }, { label: 'Collector\'s Edition', value: 'collectors' }];
    default: return [];
  }
};

module.exports = router;