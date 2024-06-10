import db from "../config/database.js";

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  avatar TEXT
)`);

function findByEmailUserRepository(email) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, username, email, avatar, password FROM users WHERE email = ?`,
      [email],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function createUserRepository(newUser) {
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = newUser;
    db.run(
      `INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)`,
      [username, email, password, avatar],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...newUser });
        }
      }
    );
  });
}

function findAllUserRepository() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, username, email, avatar FROM users`, [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function findByIdUserRepository(userId) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, username, email, avatar FROM users WHERE id = ?`,
      [userId],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function updateUserRepository(userId, user) {
  return new Promise((resolve, reject) => {
    const { username, email, password, avatar } = user;
    let query = "UPDATE users SET";
    const values = [];

    if (username !== undefined) {
      query += " username = ?,";
      values.push(username);
    }
    if (email !== undefined) {
      query += " email = ?,";
      values.push(email);
    }
    if (password !== undefined) {
      query += " password = ?,";
      values.push(password);
    }
    if (avatar !== undefined) {
      query += " avatar = ?,";
      values.push(avatar);
    }

    query = query.slice(0, -1);

    query += " WHERE id = ?";
    values.push(userId);

    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: userId, ...user });
      }
    });
  });
}

function deleteUserRepository(userId) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM users WHERE id = ?`, [userId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ message: "User deleted successfully", userId });
      }
    });
  });
}

export default {
  findByEmailUserRepository,
  createUserRepository,
  findAllUserRepository,
  findByIdUserRepository,
  updateUserRepository,
  deleteUserRepository,
};
