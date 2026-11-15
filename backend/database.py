import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "farmer.db"

def connect():
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    with connect() as con:
        con.execute("""
            CREATE TABLE IF NOT EXISTS listings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                farmer TEXT NOT NULL,
                crop TEXT NOT NULL,
                quantity REAL NOT NULL,
                price REAL NOT NULL,
                location TEXT NOT NULL,
                contact TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

def add_listing(farmer, crop, quantity, price, location, contact):
    with connect() as con:
        con.execute(
            "INSERT INTO listings (farmer,crop,quantity,price,location,contact) VALUES (?,?,?,?,?,?)",
            (farmer, crop, quantity, price, location, contact)
        )

def get_listings():
    with connect() as con:
        rows = con.execute("SELECT * FROM listings ORDER BY id DESC").fetchall()
        return [dict(row) for row in rows]
