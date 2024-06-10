import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES users(id)
)`);

function createBookRepository(newBook, userId) {
  return new Promise((resolve, reject) => {
    const { title, author } = newBook;
    db.run(
      `INSERT INTO books (title, author, userId) VALUES (?, ?, ?)`,
      [title, author, userId],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newBook });
        }
      }
    );
  });
}

function findAllBooksRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findBookByIdRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function updateBookRepository(updatedBook, bookId) {
  return new Promise((resolve, reject) => {
    const { title, author, userId } = updatedBook;
    let query = "UPDATE books SET";
    const values = [];

    if (title !== undefined) {
      query += " title = ?,";
      values.push(title);
    }
    if (author !== undefined) {
      query += " author = ?,";
      values.push(author);
    }

    // Remove a vírgula extra no final da query
    query = query.slice(0, -1);

    query += " WHERE id = ?";
    values.push(bookId);

    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: bookId, ...updatedBook });
      }
    });
  });
}

function deleteBookRepository(bookId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [bookId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "Book deleted successfully", bookId });
      }
    });
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  findBookByIdRepository,
  updateBookRepository,
  deleteBookRepository,
};
