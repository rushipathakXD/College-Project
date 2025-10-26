// server.js - Node.js + Express + SQLite API for AQuiLL
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = new sqlite3.Database('./aquill.db');

app.use(cors());
app.use(bodyParser.json());

// Create tables if not exist
// Users, Products, Orders
// (Add more fields as needed)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, email TEXT UNIQUE, password TEXT, mobile TEXT, city TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, price REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER, items TEXT, total REAL, address TEXT, paymentMode TEXT, status TEXT
  )`);
});

// User signup
app.post('/api/signup', (req, res) => {
  const { name, email, password, mobile, city } = req.body;
  db.run(
    `INSERT INTO users (name, email, password, mobile, city) VALUES (?, ?, ?, ?, ?)`,
    [name, email, password, mobile, city],
    function (err) {
      if (err) return res.status(400).json({ error: 'Email already exists' });
      res.json({ id: this.lastID });
    }
  );
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, user) => {
      if (user) res.json(user);
      else res.status(401).json({ error: 'Invalid credentials' });
    }
  );
});

// Get products
app.get('/api/products', (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    res.json(rows);
  });
});

// Place order
app.post('/api/orders', (req, res) => {
  const { user_id, items, total, address, paymentMode, status } = req.body;
  db.run(
    `INSERT INTO orders (user_id, items, total, address, paymentMode, status) VALUES (?, ?, ?, ?, ?, ?)`,
    [user_id, JSON.stringify(items), total, address, paymentMode, status],
    function (err) {
      if (err) return res.status(400).json({ error: 'Order failed' });
      res.json({ id: this.lastID });
    }
  );
});

// Get user orders
app.get('/api/orders/:user_id', (req, res) => {
  db.all(
    `SELECT * FROM orders WHERE user_id = ?`,
    [req.params.user_id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));
