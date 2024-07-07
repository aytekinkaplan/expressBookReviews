const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Kullanıcı Adının Geçerli Olduğunu Kontrol Et
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Kullanıcıyı Doğrula
const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// Giriş Yapma
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ username }, "secret_key");
    req.session.authorization = { accessToken };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// İnceleme Ekleme
regd_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const { username } = req.user;

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    res.status(200).json({ message: "Review added successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
