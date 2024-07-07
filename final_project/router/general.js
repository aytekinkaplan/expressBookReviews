const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }
  users.push({ username, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Kitap Listesini Almak
public_users.get("/", function (req, res) {
  res.status(200).json(books);
});

// ISBN'e Göre Kitap Detaylarını Almak
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Yazara Göre Kitap Detaylarını Almak
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author.toLowerCase();
  const result = [];
  for (let key in books) {
    if (books[key].author.toLowerCase().includes(author)) {
      result.push(books[key]);
    }
  }
  res.status(200).json(result);
});

// Başlığa Göre Kitap Detaylarını Almak
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title.toLowerCase();
  const result = [];
  for (let key in books) {
    if (books[key].title.toLowerCase().includes(title)) {
      result.push(books[key]);
    }
  }
  res.status(200).json(result);
});

// Kitap İncelemelerini Almak
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
