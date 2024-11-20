const express = require('express');
const router = express.Router();
const db = require('./db');



// Отримати всі продукти
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
    query += ` ORDER BY ${sort} ${orderDirection}`;
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Помилка отримання продуктів" });
    } else {
      res.json(rows);
    }
  });
});

// Отримати продукт за ID разом із варіантами
router.get('/items/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM products WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const variantsSql = `SELECT * FROM product_variants WHERE product_id = ?`;
    db.all(variantsSql, [id], (err, variants) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ ...row, selectableOptions: variants });
    });
  });
});

module.exports = router;

// Додати товар до кошика
router.post('/cart', (req, res) => {
  const { id, selectedOption, quantity } = req.body;

  const sql = `SELECT * FROM product_variants WHERE product_id = ? AND value = ?`;
  db.get(sql, [id, selectedOption], (err, variant) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!variant || variant.quantity < quantity) {
      return res.status(400).json({
        success: false,
        error: `Only ${variant?.quantity || 0} items available for this option.`,
      });
    }

    res.json({ success: true, message: "Item added to cart." });
  });
});

// Оновити доступну кількість
router.post('/update-quantity', (req, res) => {
  const { productId, selectedOption, quantity } = req.body;

  const sql = `
    UPDATE product_variants
    SET quantity = quantity - ?
    WHERE product_id = ? AND value = ?
  `;

  db.run(sql, [quantity, productId, selectedOption], function (err) {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Quantity updated successfully." });
  });
});

module.exports = router;
