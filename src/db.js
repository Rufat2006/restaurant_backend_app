import Database from "better-sqlite3";
import dotenv from "dotenv";
dotenv.config();
const db = new Database(process.env.DATABASE_FILE || "./restaurant.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
export function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin','cashier','kitchen')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      en_name TEXT NOT NULL,
      az_name TEXT NOT NULL,
      description TEXT DEFAULT '',
      category TEXT NOT NULL DEFAULT 'General',
      price REAL NOT NULL CHECK(price >= 0),
      image_url TEXT DEFAULT '',
      available INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_no TEXT NOT NULL UNIQUE,
      table_no TEXT DEFAULT '',
      order_type TEXT NOT NULL CHECK(order_type IN ('dinein','takeaway','delivery')),
      payment_method TEXT NOT NULL CHECK(payment_method IN ('cash','card')),
      status TEXT NOT NULL CHECK(status IN ('new','preparing','ready','served','cancelled')) DEFAULT 'new',
      subtotal REAL NOT NULL,
      discount REAL NOT NULL DEFAULT 0,
      service REAL NOT NULL DEFAULT 0,
      vat REAL NOT NULL DEFAULT 0,
      total REAL NOT NULL,
      created_by INTEGER,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(created_by) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      menu_item_id INTEGER,
      name TEXT NOT NULL,
      unit_price REAL NOT NULL,
      qty INTEGER NOT NULL CHECK(qty > 0),
      line_total REAL NOT NULL,
      FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY(menu_item_id) REFERENCES menu_items(id)
    );
  `);
}
export default db;
